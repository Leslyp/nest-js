# RV standard image https://github.com/RedVentures/container-image-pipeline
FROM 089022728777.dkr.ecr.us-east-1.amazonaws.com/rv-node-18-alpine:1.0.18

ENV PORT=3000

WORKDIR /app

COPY . .

EXPOSE $PORT

CMD ["node", "dist/main.js"]
