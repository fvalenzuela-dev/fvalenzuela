# FValenzuela

## Project Overview

FValenzuela is a monolith application built with **Next.js 15**, **React 19**, and integrated with **Clerk** for authentication and **GCP (Google Cloud Platform)** for deployment.

For project-specific coding guidelines and standards for AI agents, please refer to [AGENTS.md](./AGENTS.md).

## Environment Configuration

This project uses environment variables to manage configuration across different environments (Development, Production, and Local). These variables handle Clerk authentication and API endpoint routing.

### Local Development

To set up your local environment, copy the example environment file and fill in the required values:

```bash
cp .env.example .env.local
```

### Environment Files

The following environment files are tracked in the repository and used by the CI/CD pipeline:
- `.env.example`: A template for local development.
- `.env.dev`: Configuration used for builds targeting the development environment.
- `.env.prod`: Configuration used for builds targeting the production environment.

> **Note**: Variables prefixed with `NEXT_PUBLIC_` are embedded into the client-side JavaScript bundle at build time.

### Key Environment Variables

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public key for Clerk authentication. |
| `CLERK_SECRET_KEY` | Private key for Clerk authentication (Server-side). |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Route for the sign-in page (default: `/sign-in`). |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect path after successful authentication. |
| `NEXT_PUBLIC_API_URL` | Base URL for the primary API service. |
| `NEXT_PUBLIC_PYTHON_API_URL` | Base URL for the Python backend service. |

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
- `npm test`: Runs the test suite using React Testing Library.

## Deployment

### Docker Build Configuration

The `Dockerfile` utilizes a build argument `ENV_FILE` to determine which environment configuration to bake into the image during the build process. This is necessary for Next.js to correctly embed `NEXT_PUBLIC_` variables.

To build the image manually:
```bash
# Default (dev)
docker build -t fvalenzuela .

# Production build
docker build --build-arg ENV_FILE=.env.prod -t fvalenzuela-prod .
```

### CI/CD Workflows

Automated deployments to Google Cloud Platform are handled via GitHub Actions:
- **Development**: Triggered by the `.github/workflows/docker-gcp-dev.yml` workflow. Deploys to Cloud Run service `mi-app-next-dev-deploy`.
- **Production**: Triggered by the `.github/workflows/docker-gcp-prod.yml` workflow. Deploys to Cloud Run service `prod-deploy`.

Both workflows use a centralized reusable workflow defined in the organization's `.github` repository.