# Copilot Instructions

This is an Astro blog using a modern version of Node.js running in a devcontainer.

## Project Details
- Framework: Astro
- Node.js Version: Modern (e.g., 16.x or later)
- Environment: Devcontainer

## Instructions for Copilot
- Follow Astro best practices.
- Ensure compatibility with the specified Node.js version.
- Assume the code will run in a devcontainer environment.
- The blog posts are fetched at build time using `getCollection('blog')`.
- Any new posts require a rebuild and redeployment of the app.
- The build and deployment process is handled by a CI/CD pipeline defined in `.github/workflows/main.yml`.