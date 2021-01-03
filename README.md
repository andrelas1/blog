# My Blog

- Server-side rendered with NodeJS 12 LTS
- No frontend frameworks. This uses as much as possible Web APIs
- CSS libraries would be good to save time

## Notes

One could think that it's a waste of time not using tools like Gatsby or NextJS to develop a blog. However, I didn't go that path because I wanted to use what the browser already gives natively. Also, I prefer to learn more about the native features of JS, CSS and HTML instead of using abstractions like the frameworks listed above. The other reasons:

- Dependency on these tools
- Less flexibility
- Learn the technology, not the tool
- Easier to maintain compatibility as the browser evolves

# Color Palette

https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557

# Getting started

Requirements:

- Docker

run:

- `docker-compose -f docker-compose.dev.yml up --build`

This will start the backend docker image (the express server) and the database in MongoDB.

Access the app in `locahost:3000`

# Local development

For local development, this project uses Docker. It's nice to have MongoDB in a Docker container instead of in the local machine. That gives the possibility to deploy the containers instead of the code, but that is an option that is not being used for deployment.

## Requirements for development

1. Make sure Docker is installed
2. Make sure the image is built. If it is not, run `docker build --tag blog-backend:1.0 .`

## Development

For development, run:

- `docker-compose -f docker-compose.dev.yml up --build`

This command will spin up the NodeJS app container as well as the MongoDB container for development. This uses the `docker-compose.dev.yml` file, making sure that the MongoDB container is created before the NodeJS app.

## Development with a local MongoDB

To develop without the MongoDB container, run:

`docker run --publish 8001:8001 --name bb blog-backend:1.0`

This will run only the backend, but make sure that the code in docker-compose.dev.yml has the correct configuration to connect to the local MongoDB database.

# Handy Docker commands

## Delete container

`docker rm --force bb`

## Check containers

`docker ps -a`

## Restart or stop containers

`docker stop bb`

## Run ssh into a container

`docker exec -it <container name> /bin/bash`

# Deployment

## CD Pipeline

This should have a CD pipeline that will do the following:

1. Run a few e2e tests to make sure the most important things are in order
2. Fetch the code from the repository
3. Make sure there are environment variables to connect to the database in a different server
4. Install NPM deps
5. Build the blog app pages into EJS files (Home, Blogpost, Profile)
6. Generate other static assets to their correct folder if applicable
7. Run the app in a NodeJS environment

### Notes

Since this project uses Docker, one could think that deploying only the containers would be ideal, since these are already used for deployment. However, there are abstractions when doing this process that makes me feel out of control of my own project, so I prefer to make it simple and deploy them without Docker. Deploying with Docker would reflect on using tools that work together with Docker, like Azure. I prefer to keep it simple so that I have more:

1. Ownership
2. Simplicity
3. Flexibility

In the future, there is still the possibility to deploy using something like Docker Compose in Azure (https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose). Or another option would be to deploy both containers separately, also using something like Azure (https://docs.docker.com/engine/context/aci-integration/ or https://docs.microsoft.com/en-us/azure/container-instances/container-instances-quickstart).
