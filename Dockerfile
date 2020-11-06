# Use the official image as a parent image.
FROM node:14.15.0

# Improve performance in Nodejs
ENV NODE_ENV=production

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY ["package.json", "package-lock.json*", "./"]

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8001

# Run the specified command within the container.
CMD [ "npm", "run", "start:backend" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .