
output "execution_arn" {
  value = aws_apigatewayv2_api.http_api.execution_arn
}

output "api_id" {
  value = aws_apigatewayv2_api.http_api.id
}

output "authorizer_id" {
  value = aws_apigatewayv2_authorizer.auth0.id
}