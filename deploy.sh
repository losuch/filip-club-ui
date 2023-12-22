#!/bin/bash

# login to the ecr to get pushed docker image
# aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/filip-club-ui
aws ecr get-login-password --region eu-central-1 --profile github-ci | docker login --username AWS --password-stdin 396315277532.dkr.ecr.eu-central-1.amazonaws.com/filip-club-ui


# deploy application
docker run --name filip-club-ui --network fc-network -p 80:80 -d 396315277532.dkr.ecr.eu-central-1.amazonaws.com/filip-club-ui:latest
