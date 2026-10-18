/*
    Declare all top-level variables required for POS app.
*/

variable "environment" {
  description = "Deployment Environment Shortname - DEV, QA, PROD"
  type        = string
  default     = "DEV"
}

variable "aws_region" {
  description = "AWS Region to deploy resources in."
  type        = string
  default     = "us-east-2"
}

variable "aws_access_key" {
  description = "AWS IAM Access Key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS IAM Secret Key"
  type        = string
}

variable "hosted_zone_id" {
  description = "Top-level Route53 Hosted Zone ID."
  type        = string
}
