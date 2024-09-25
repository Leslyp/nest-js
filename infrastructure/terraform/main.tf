
module "ecs-app" {
    source  = "app.terraform.io/bankrate/ecs-app/aws"
    version = "14.1.1"

    # Variables
    app_name    = var.app_name
    environment = var.environment
    tags        = local.tags

    lb_is_public            = true
    health_check_path       = "/health"
    enable_http             = false
    enable_https            = true
    enable_ecr_repo         = true
    enable                  = true
    container_ingress_port  = var.container_ingress_port

    business_unit           = var.business_unit
    finserv_team            = var.finserv_team

    # This custom task definition does two things:
    # 1. it enables image promotion by changing the image to be pulled from the prod ECR
    # 2. it enables custom task definition vars to let secrets be passed into the app

    custom_task_definition_file_path    = "./templates/task-definition.tpl"
    custom_task_definition_vars         = {
        secrets = trimsuffix(trimspace(<<EOT
            %{for k, v in local.secrets~}
            {
                "name": "${k}",
                "valueFrom": "${aws_ssm_parameter.app_secrets[k].arn}"
            },
            %{endfor~}
            EOT
            ), ",")
        env_vars = jsonencode(local.environment_variables)
    }

    architecture = {
        service_with_alb                = true
        service_with_nlb                = false
        service_with_service_discovery  = false
        service_standalone              = false
        cloudwatch_triggered_task       = false
    }
}