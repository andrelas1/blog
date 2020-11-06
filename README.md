# My Blog

- No frameworks yet, but CycleJS is an idea or just Web Components.
- React UI could be also an idea, but very minimal.
- CSS libraries would be good.
  to make life easier

# Color Palette

https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557

# Docker handy commands

## Build image

`docker build --tag blog-backend:1.0 .`

## Run container

`docker run --publish 8001:8001 --name bb blog-backend:1.0`

## Delete container

`docker rm --force bb`

## Check containers

`docker ps -a`

## Restart or stop containers

`docker stop bb`

## Run ssh into a container

`docker exec -it <container name> /bin/bash`

## Run docker-compose and rebuild the image

`docker-compose -f docker-compose.dev.yml up --build`
