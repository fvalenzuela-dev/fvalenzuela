# fvalenzuela

Next.js frontend application with Docker and GCP integration.

## Project Overview

fvalenzuela is a frontend application built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It serves as a personal portfolio and a multi-app hub. The project is integrated with **Clerk** for authentication and configured for automated deployment to **GCP (Google Cloud Platform)** via **Cloud Run**.

For project-specific coding guidelines and standards for AI agents, please refer to [AGENTS.md](./AGENTS.md).

## Environment Variables

This project uses environment variables to manage configuration across different environments. Variables prefixed with `NEXT_PUBLIC_` are embedded into the JavaScript bundle at build time. 

### Local Development

To set up your local environment, copy the example environment file and fill in the required values:

```bash
cp .env.example .env.local
```

### CI/CD and Docker Builds

Environment variables are no longer loaded from static files (like `.env.dev` or `.env.prod`) during the Docker build process. Instead, they are passed as **Docker build arguments**. This ensures that the build-time constants required by Next.js are correctly baked into the production bundle.

#### Required Build Arguments

The following variables must be provided during the Docker build phase:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Path for the sign-in page.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Redirect path after sign-in.
- `NEXT_PUBLIC_API_URL`: The main API endpoint.
- `NEXT_PUBLIC_PYTHON_API_URL`: The Python-specific API endpoint.

#### GitHub Actions Integration

Our CI/CD pipelines automatically inject these variables using GitHub Secrets. This is configured in the following workflows:

- **Development**: `.github/workflows/docker-gcp-dev.yml` (uses `*_DEV` secrets).
- **Production**: `.github/workflows/docker-gcp-prod.yml` (uses `*_PROD` secrets).

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the built production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Deployment

### Manual Docker Build

To build the image locally with the same logic used in the pipeline, use `--build-arg` for each public variable:

```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
  --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/ \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3000/api \
  --build-arg NEXT_PUBLIC_PYTHON_API_URL=http://localhost:8000 \
  -t fvalenzuela .
```