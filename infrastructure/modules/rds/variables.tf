variable "cluster_identifier" {
  description = "Cluster identifier string. This is the name."
type = string
}

variable "database_name" {
  description = "Name of the DB to be created within the cluster."
  type = string
  default = "postgres"
}

variable "allowed_cidr_blocks" {
  description = "Allowed ingress CIDR blocks."
  type = list(string)
  default = [ "10.0.0.0/8" ]
}

variable "vpc_id" {
  description = "VPC ID for the DB to be created in."
}

variable "subnet_ids" {
  description = "Subnet IDs to use for the DB subnet group."
}

