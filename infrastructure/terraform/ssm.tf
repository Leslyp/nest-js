data "aws_kms_key" "parameter_store" {
  key_id = "alias/parameter_store_key"
}

data "aws_kms_alias" "parameter_store" {
  name = "alias/parameter_store_key"
}

data "aws_caller_identity" "current" {

}

resource "aws_ssm_parameter" "app_secrets" {
  for_each = local.secrets

  name   = lower("/${var.environment}/${var.app_name}/${each.key}")
  type   = "SecureString"
  key_id = data.aws_kms_alias.parameter_store.name
  value  = each.value # Go set manually in the console
  tags   = merge(local.tags, { Name = lower("/${var.environment}/${var.app_name}/${each.key}") })

  lifecycle {
    ignore_changes = [
      value,
      description,
    ]
  }
}

# Create policy document template allowing the application to pull the env vars from param store
data "aws_iam_policy_document" "parameter_store_policy_doc" {
  statement {
    sid    = "kmsAccess"
    effect = "Allow"

    actions = [
      "kms:Decrypt",
    ]

    resources = [
      data.aws_kms_key.parameter_store.arn,
    ]
  }

  statement {
    sid    = "ssmAccess"
    effect = "Allow"

    actions = [
      "ssm:GetParameters",
    ]

    resources = [
      "arn:aws:ssm:us-east-1:${data.aws_caller_identity.current.account_id}:parameter/${var.environment}/${var.app_name}/*"
    ]
  }
}

# Attach policy to the fargate server's IAM Role
resource "aws_iam_role_policy" "attach_parameter_store_policy" {
  role   = module.ecs-app.server_iam_role_name
  name   = "${var.app_name}-${var.environment}-parameter-store"
  policy = data.aws_iam_policy_document.parameter_store_policy_doc.json
}