
variable "name" {
  description = "Lambda function name."
  type        = string
}

variable "supported_runtimes" {
  description = "Lambda runtimes supported by the layer."
  default = [
    "python3.12"
  ]
}
