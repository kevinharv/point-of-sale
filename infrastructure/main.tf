/*
    Entrypoint for POS application infrastructure.
*/

module "apigw_pos" {
  source         = "./modules/api_gateway"
  hosted_zone_id = var.hosted_zone_id
  domain_name    = "pos-api.aws.kevharv.com"
  auth_audience  = "https://pos-api.aws.kevharv.com"
  auth_issuer    = "https://dev-kevharv.us.auth0.com/"
}

module "lambda_kds" {
  source              = "./modules/lambda"
  name                = "kds"
  environment         = var.environment
  apigw_execution_arn = module.apigw_pos.execution_arn

  apigw_id      = module.apigw_pos.api_id
  route_key     = "ANY /{proxy+}"
  authorizer_id = module.apigw_pos.authorizer_id

  role_name  = aws_iam_role.lambda_exec.name
  role_arn   = aws_iam_role.lambda_exec.arn
  policy_arn = aws_iam_policy.lambda_basic_logging.arn
}

/* LAMBDA FUNCTION IAM SETUP */

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "lambda_basic_logging" {
  name = "lambda_basic_logging_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}
