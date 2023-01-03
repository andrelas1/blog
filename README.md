# My Blog

I am using SSG to generate all statics on build time.

## Notes

It was an option to use Gatsby, Nuxt or Remix to develop this blog but I really dislike migrations and solving NPM deps issues so I tried to not use any of those tools.

However I still can simplify the build process.

# Color Palette

https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557

# Local development

Generate the html template => `npm run ssg`
Build the assets with the html template => `npm run build`
Serve the assets in the /public folder =>`npm run serve`

Some environment variables are needed:

```
# The Netlify dashboard should have those values
NETLIFY_AUTH_TOKEN
NETLIFY_WEBSITE_NAME


# The  Sanity dashboard should have those values
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_TOKEN
```

template:

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
