

resource "random_password" "master_password" {
  length  = 16
  special = true
}

resource "aws_secretsmanager_secret" "rds_credentials" {
  name                    = "rds-db-credentials/${var.cluster_identifier}"
  description             = "RDS DB master credentials."
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "rds_credentials" {
  secret_id = aws_secretsmanager_secret.rds_credentials.id
  secret_string = jsonencode({
    username            = "postgres"
    password            = random_password.master_password.result
    engine              = "postgres"
    host                = aws_rds_cluster.aurora_cluster.endpoint
    port                = aws_rds_cluster.aurora_cluster.port
    dbname              = var.database_name
    dbClusterIdentifier = aws_rds_cluster.aurora_cluster.cluster_identifier
  })
}

resource "aws_security_group" "rds_security_group" {
  name_prefix = "${var.cluster_identifier}-sg"
  vpc_id      = var.vpc_id
  description = "Security grtoup for allowing ingress to PostgrSQL cluster."

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "${var.cluster_identifier}-subnet-group"
  subnet_ids = var.subnet_ids
}

resource "aws_rds_cluster_parameter_group" "rds_cluster_parameter_group" {
  family      = "aurora_postgresql16"
  name        = "${var.cluster_identifier}-cluster-parameter-group"
  description = "RDS cluster parameter group for serverless PostgreSQL 16."

  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements"
  }

  parameter {
    name  = "log_statement"
    value = "all" # For development debugging
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000" # Log queries > 1s
  }

  # Enable auto_explain for development
  parameter {
    name  = "auto_explain.log_min_duration"
    value = "5000" # Log execution plans for queries > 5s
  }
}

resource "aws_iam_role_policy" "rds_secret_policy" {
  name = "${var.cluster_identifier}-secret-policy"
  role = aws_iam_role.rds_secret_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = aws_secretsmanager_secret.aurora_credentials.arn
      }
    ]
  })
}

resource "aws_rds_cluster" "aurora_cluster" {
  cluster_identifier = var.cluster_identifier
  engine             = "aurora-postgresql"
  engine_mode        = "provisioned" # Serverless v2 uses provisioned mode
  engine_version     = "16.6"        # PostgreSQL 16 compatible
  database_name      = var.database_name

  # Use Secrets Manager for credentials (matching console)
  master_username             = "postgres"
  manage_master_user_password = false # We manage it via Secrets Manager
  master_password             = random_password.master_password.result

  # Networking
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_security_group.id]

  # Serverless v2 scaling configuration (matching console settings)
  serverlessv2_scaling_configuration {
    max_capacity             = 2
    min_capacity             = 0
    seconds_until_auto_pause = 300
  }

  # Parameter groups
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.rds_cluster_parameter_group.name

  # Dev/Test template settings
  backup_retention_period      = 0
  copy_tags_to_snapshot        = true

  # Dev/Test optimizations
  skip_final_snapshot = true  # Don't create snapshot on destroy
  deletion_protection = false # Allow deletion for dev/test
  apply_immediately   = true  # Apply changes immediately

  # Disable expensive features for dev/test
  enabled_cloudwatch_logs_exports = [] # No CloudWatch logs export

  # Storage configuration
  storage_encrypted = true
  kms_key_id        = "alias/aws/rds" # Use default AWS managed key

  depends_on = [
    aws_rds_cluster_parameter_group.rds_cluster_parameter_group,
    aws_iam_role_policy.rds_secret_policy
  ]
}

# Aurora Serverless v2 instance
resource "aws_rds_cluster_instance" "aurora_instance" {
  identifier         = "${var.cluster_identifier}-instance-1"
  cluster_identifier = aws_rds_cluster.aurora_cluster.id
  instance_class     = "db.serverless" # Serverless v2 instance class
  engine             = aws_rds_cluster.aurora_cluster.engine
  engine_version     = aws_rds_cluster.aurora_cluster.engine_version

  # Dev/Test settings - no enhanced monitoring to save costs
  monitoring_interval          = 0     # Disable enhanced monitoring
  performance_insights_enabled = false # Disable PI for dev/test
  auto_minor_version_upgrade   = true  # Auto upgrade minor versions
}
