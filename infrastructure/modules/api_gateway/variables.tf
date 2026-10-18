

variable "hosted_zone_id" {
  description = "Hosted Zone ID of the parent Route53 hosted zone."
  type = string
}

variable "domain_name" {
  description = "Domain name (subdomain) for the API Gateway."
  type = string
}

variable "auth_audience" {
  description = "OAuth audience for the API Gateway authorizer."
  type = string
}

variable "auth_issuer" {
  description = "OAuth issuer URL for the API Gateway authorizer."
  type = string
}