[
  {
    "cpu": 0,
    "name": "${app_name}",
    "image": "835272777014.dkr.ecr.us-east-1.amazonaws.com/prod-change-me",
    "essential": true,
    "compatibilities": [
      "FARGATE"
    ],
    "portMappings": [
      {
        "containerPort": ${container_port},
        "hostPort": ${host_port},
        "protocol": "tcp"
      }
    ],
    "mountPoints": [],
    "volumesFrom": [],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${logs_group}",
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "secrets": [
      ${secrets}
    ],
    "environment": ${env_vars},
    "dockerLabels": {}
  }
]