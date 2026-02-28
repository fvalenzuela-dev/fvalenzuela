# Project Documentation

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

Both workflows use a centralized reusable workflow defined in `_org-workflow/build-and-push-docker-gcp.yml`.