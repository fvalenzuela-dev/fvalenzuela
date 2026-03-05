import fs from "node:fs";
import path from "node:path";

export interface PackageMetadata {
  readonly name: string;
  readonly version: string;
  readonly description?: string;
  readonly scripts?: Readonly<Record<string, string>>;
  readonly dependencies?: Readonly<Record<string, string>>;
  readonly devDependencies?: Readonly<Record<string, string>>;
}

const DEFAULT_DESCRIPTION =
  "Next.js monolith that powers the FValenzuela portfolio and multi-app hub.";

const PROJECT_OVERVIEW =
  "Built with Next.js 15, React 19, and Tailwind CSS v4. The app uses Clerk for authentication and ships to GCP Cloud Run as a single domain that hosts multiple app experiences under sub-routes.";

const formatKeyValueList = (
  entries: Readonly<Record<string, string>> | undefined,
  emptyLabel: string
): string => {
  if (!entries || Object.keys(entries).length === 0) {
    return `- ${emptyLabel} none`;
  }

  return Object.entries(entries)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
};

const formatScripts = (
  scripts: Readonly<Record<string, string>> | undefined
): string => {
  const filteredScripts = scripts ?? {};
  if (Object.keys(filteredScripts).length === 0) {
    return "- No npm scripts configured";
  }

  return Object.entries(filteredScripts)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `- \`${key}\`: ${value}`)
    .join("\n");
};

const indentList = (value: string): string =>
  value
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

export const generateReadmeContent = (
  metadata: Readonly<PackageMetadata>
): string => {
  const {
    name,
    version,
    description,
    scripts,
    dependencies,
    devDependencies,
  } = metadata;

  const dependencyList = formatKeyValueList(
    dependencies,
    "Dependencies"
  );
  const devDependencyList = formatKeyValueList(
    devDependencies,
    "Dev dependencies"
  );
  const scriptList = formatScripts(scripts);

  return `# ${name}

${description ?? DEFAULT_DESCRIPTION}

## Project Overview
${PROJECT_OVERVIEW}

## Installation
Install dependencies after cloning the repository:

\`\`\`bash
npm install
\`\`\`

## Usage
- \`npm run dev\`: Start the development server
- \`npm run build\`: Build for production
- \`npm run start\`: Run the production server
- \`npm run lint\`: Lint the codebase
- \`npm test\`: Execute the test suite

## Project Metadata
- **Version:** ${version}
- **Scripts:**
${indentList(scriptList)}
- **Dependencies:**
${indentList(dependencyList)}
- **Dev Dependencies:**
${indentList(devDependencyList)}

## Environment Variables
Use a \`.env.local\` file for local development. Variables prefixed with \`NEXT_PUBLIC_\` are embedded into the client bundle. During Docker builds, pass required values as build arguments (e.g., \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\`, \`NEXT_PUBLIC_API_URL\`).

## Deployment
Workflows deploy the application to Google Cloud Run for both development and production using Docker images. Authentication is handled by Clerk across hosted sub-routes such as \`/auth/auth1\` and \`/auth/auth2\`.

## Documentation Automation
Run \`npm run update:readme\` to generate or refresh this README from the latest project metadata. The command will create the file if it is missing and keep sections like version, scripts, and dependencies in sync with \`package.json\`.
`;
};

export const syncReadme = (
  metadata: Readonly<PackageMetadata>,
  readmePath: string
): string => {
  const content = `${generateReadmeContent(metadata).trimEnd()}\n`;
  const directory = path.dirname(readmePath);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(readmePath, content, "utf8");
  return content;
};
