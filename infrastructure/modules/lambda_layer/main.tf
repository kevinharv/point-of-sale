/*
    Lambda layer module.
*/

data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir  = "${path.root}/../services/_layers/${var.name}"
  output_path = "${path.root}/../build/layers/${var.name}_layer.zip"
}

resource "aws_lambda_layer_version" "deps" {
  layer_name          = var.name
  compatible_runtimes = var.supported_runtimes
  filename            = data.archive_file.lambda_layer.output_path
  source_code_hash    = data.archive_file.lambda_layer.output_base64sha256
}
