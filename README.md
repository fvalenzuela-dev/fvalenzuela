# fvalenzuela

Next.js frontend application with Docker and GCP integration.

## Project Overview

fvalenzuela is a frontend application built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It serves as a personal portfolio and a multi-app hub. The project is integrated with **Clerk** for authentication and configured for automated deployment to **GCP (Google Cloud Platform)** via **Cloud Run**.

For project-specific coding guidelines and standards for AI agents, please refer to [AGENTS.md](./AGENTS.md).

## Environment Variables

This project uses environment variables to manage configuration across different environments. Variables prefixed with `NEXT_PUBLIC_` are embedded into the JavaScript bundle at build time. 

### Local Development

For local development, use a `.env.local` file. This file is excluded from version control.

To set up your local environment, copy the example environment file and fill in the values:

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

Our CI/CD pipelines automatically inject these variables using **GitHub Action Variables** (and Secrets for project identifiers). This is configured in the following workflows:

- **Development**: `.github/workflows/docker-gcp-dev.yml` (uses `*_DEV` variables).
- **Production**: `.github/workflows/docker-gcp-prod.yml` (uses `*_PROD` variables).

## Getting Started

### Prerequisites

- Node.js 18 or 20
- Docker (for containerized environments)

### Installation

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the built production server.
- `npm run lint`: Runs ESLint to check for code quality issues.