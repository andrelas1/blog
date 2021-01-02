# Use the official image as a parent image.
FROM node:14.15.1

# Improve performance in Nodejs
ENV NODE_ENV=production

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY ["package.json", "package-lock.json*", "./"]

# Run the command inside your image filesystem.
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the specified command within the container.
CMD [ "npm", "run", "build:frontend" ]