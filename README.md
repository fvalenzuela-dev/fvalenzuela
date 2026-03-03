# fvalenzuela

Next.js frontend application with Docker and GCP integration.

## Environment Variables

This project uses environment variables to manage configuration across different environments. Note that variables prefixed with `NEXT_PUBLIC_` are embedded into the JavaScript bundle at build time.

### Local Development

To set up your local environment, copy the example environment file and fill in the required values:

```bash
cp .env.example .env.local
```

### CI/CD and Docker Builds

In this project, environment variables are no longer loaded from static files (like `.env.dev` or `.env.prod`) during the build process. Instead, they are passed as **Docker build arguments**.

#### Required Build Arguments

The following variables must be provided during the Docker build phase:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Path for the sign-in page.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Redirect path after sign-in.
- `NEXT_PUBLIC_API_URL`: The main API endpoint.
- `NEXT_PUBLIC_PYTHON_API_URL`: The Python-specific API endpoint.

#### GitHub Actions Integration

Our CI/CD pipelines automatically inject these variables using GitHub Secrets. This is configured in the following workflows:

- **Development**: `.github/workflows/docker-gcp-dev.yml` (uses `*_DEV` secrets)
- **Production**: `.github/workflows/docker-gcp-prod.yml` (uses `*_PROD` secrets)

### Validation Pipeline

Code validation is performed on every push (except for `main`, `develop`, and `qa` branches) via the **Pipeline validation code** (`.github/workflows/central-validation.yml`).