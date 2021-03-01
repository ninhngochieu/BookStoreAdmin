#!/bin/bash

DOCKER_IMAGE=adivietadmin:test
CONTAINER_NAME=admin_vlaunch_aws
DOMAIN=admin.vlaunch.aws

PORT=127.0.0.1:8902

echo Delete old container...
docker rm -f $CONTAINER_NAME

echo Run new container...
docker run -d \
    --name=$CONTAINER_NAME \
    -p $PORT:80 \
    $DOCKER_IMAGE
