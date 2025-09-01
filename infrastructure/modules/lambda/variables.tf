
variable "name" {
  description = "Lambda function name."
  type = string
}

variable "description" {
  description = "Lambda function description."
  type = string
  default = ""
}

variable "environment" {
  description = "Deployment environment shortname."
  type = string
}

variable "layer_arns" {
  description = "Lambda layer ARN list."
  type = list(string)
  default = []
}

variable "apigw_execution_arn" {
  description = "API Gateway Execution ARN"
  type = string
}

/* LAMBDA + API GATEWAY ROUTE VARIABLES */

variable "apigw_id" {
  description = "API Gateway ID"
  type = string
}

variable "route_key" {
  description = "The API Gateway route key for the route. (Ex: GET /user)"
  type = string
}

variable "authorizer_id" {
  description = "API Gateway authorizer ID."
  type = string
}

/* IAM INFO */

variable "role_name" {
  description = "IAM Role Name for Lambda function to assume."
  type = string
}

variable "role_arn" {
  description = "IAM Role ARN for the Lambda function to assume."
  type = string
}

variable "policy_arn" {
  description = "IAM Policy ARN for the Lambda function to use."
  type = string
}
