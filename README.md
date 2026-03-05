# fvalenzuela

Next.js monolith that powers the FValenzuela portfolio and multi-app hub.

## Project Overview
Built with Next.js 15, React 19, and Tailwind CSS v4. The app uses Clerk for authentication and ships to GCP Cloud Run as a single domain that hosts multiple app experiences under sub-routes.

## Installation
Install dependencies after cloning the repository:

```bash
npm install
```

## Usage
- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Run the production server
- `npm run lint`: Lint the codebase
- `npm test`: Execute the test suite

## Project Metadata
- **Version:** 1.0.9
- **Scripts:**
  - `build`: next build
  - `dev`: next dev
  - `lint`: eslint
  - `start`: next start
  - `test`: jest
  - `update:readme`: ts-node --esm --experimentalSpecifierResolution=node scripts/update-readme.ts
- **Dependencies:**
  - @clerk/nextjs: ^6.37.3
  - @headlessui/react: ^2.2.9
  - @iconify/react: ^4.1.1
  - next: 16.1.6
  - react: 19.2.3
  - react-dom: 19.2.3
- **Dev Dependencies:**
  - @tailwindcss/postcss: ^4
  - @testing-library/jest-dom: ^6.9.1
  - @testing-library/react: ^16.3.2
  - @types/jest: ^30.0.0
  - @types/node: ^20
  - @types/react: ^19
  - @types/react-dom: ^19
  - eslint: ^9
  - eslint-config-next: 16.1.6
  - identity-obj-proxy: ^3.0.0
  - jest: ^30.2.0
  - jest-environment-jsdom: ^30.2.0
  - lcov: ^1.16.0
  - tailwindcss: ^4
  - ts-node: ^10.9.2
  - typescript: ^5

## Environment Variables
Use a `.env.local` file for local development. Variables prefixed with `NEXT_PUBLIC_` are embedded into the client bundle. During Docker builds, pass required values as build arguments (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_API_URL`).

## Deployment
Workflows deploy the application to Google Cloud Run for both development and production using Docker images. Authentication is handled by Clerk across hosted sub-routes such as `/auth/auth1` and `/auth/auth2`.

## Documentation Automation
Run `npm run update:readme` to generate or refresh this README from the latest project metadata. The command will create the file if it is missing and keep sections like version, scripts, and dependencies in sync with `package.json`.
