# this enables GitHub Actions to push to the ECR

data "aws_iam_policy_document" "ecr_anvil" {
    statement {
        sid = "AllowAuthToken"
        effect = "Allow"
        actions = [
            "ecr:GetAuthorizationToken",
        ]
        resources = ["*"]
    }

    statement {
        sid = "AllowGetImages"
        effect = "Allow"
        actions = [
            "ecr:BatchGetImage",
            "ecr:GetDownloadUrlForLayer",
        ]
        resources = [
            "arn:aws:ecr:us-east-1:089022728777:repository/rv-*",
        ]
    }
}

resource "aws_iam_role_policy" "ecr_cip" {
    name = "ecr-cip"
    role = module.gha_role.role.id
    policy = data.aws_iam_policy_document.ecr_anvil.json
}