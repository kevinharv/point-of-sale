/*
    Lambda function module.
*/

resource "null_resource" "install_dependencies" {
  provisioner "local-exec" {
    command = "pip3 install -r ${path.root}/../services/${var.name}/requirements.txt -t ${path.root}/../services/${var.name}/layers/python"
  }

  triggers = {
    requirements_sha = filebase64sha256("${path.root}/../services/${var.name}/requirements.txt")
  }
}

data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir = "${path.root}/../services/${var.name}/layers"
  output_path = "${path.root}/../build/${var.name}_layer.zip"
  depends_on = [ null_resource.install_dependencies ]
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir = "${path.root}/../services/${var.name}"
  output_path = "${path.root}/../build/${var.name}.zip"
}

resource "aws_lambda_layer_version" "deps" {
  layer_name = "lambda-deps"
  compatible_runtimes = [ "python3.12" ]
  filename = data.archive_file.lambda_layer.output_path
  source_code_hash = data.archive_file.lambda_layer.output_base64sha256
}

resource "aws_lambda_function" "function" {
  function_name = "${var.environment}--LAMBDA--${var.name}"
  description = var.description
  filename = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  layers = [ aws_lambda_layer_version.deps.arn ]

  architectures = [ "arm64" ]
  memory_size = 128
  handler = "app.handler"
  runtime = "python3.12"

  role = var.role_arn
}

/* LAMBDA FUNCTION API GATEWAY ATTACHMENT */

resource "aws_apigatewayv2_integration" "lambda_integration" {
    api_id = var.apigw_id
    integration_type = "AWS_PROXY"
    integration_uri = aws_lambda_function.function.invoke_arn
    integration_method = "POST"
    payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "default_route" {
    api_id = var.apigw_id
    route_key = var.route_key
    target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
    authorizer_id = var.authorizer_id
    authorization_type = "JWT"
}

/* LAMBDA FUNCTION IAM POLICY */

resource "aws_iam_role_policy_attachment" "lambda_logging_attach" {
  role       = var.role_name
  policy_arn = var.policy_arn
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.function.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${var.apigw_execution_arn}/*/*"
}