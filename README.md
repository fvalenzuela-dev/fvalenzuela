# Frontend Project

## Deployment

This project uses GitHub Actions for CI/CD, building Docker images and deploying them to Google Cloud Run.

### GCP Infrastructure Details

- **Region:** `us-central1`
- **Container Image Name:** `gh-front-fvalenzuela`

| Environment | Artifact Registry Repository | Cloud Run Service | Build Config |
|-------------|----------------------------|-------------------|--------------|
| **Development** | `frontend-react-repo-dev` | `fvalenzuela-dev-deploy` | `ENV_FILE=.env.dev` |
| **Production** | `images-front` | `fvalenzuela-prod-deploy` | `ENV_FILE=.env.prod` |

## Core Features

### Dark Mode Support
The application includes a dark mode toggle. 
- **Persistence:** The theme preference is stored in `localStorage` under the key `theme`.
- **Behavior:** The application respects the user's manual selection (`dark` or `light`). System color scheme preferences (`prefers-color-scheme`) are no longer used for automatic switching to ensure a consistent user-selected experience.

## Author

- **GitHub:** [fvalenzuela-dev](https://github.com/fvalenzuela-dev)
- **LinkedIn:** [Fabián Valenzuela](https://www.linkedin.com/in/fvalenzuela-dev/)