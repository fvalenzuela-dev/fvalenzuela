# Agent Coding Guidelines

This document provides guidelines for agentic coding agents operating in this repository.

## Project Overview

This is a **Next.js 16** monolith application with **React 19** and **TypeScript**. It serves as a personal portfolio and multi-app hub under a single domain. It uses:
- **@clerk/nextjs** for authentication
- **@headlessui/react** for UI components
- **@iconify/react** for icons
- **Tailwind CSS v4** for styling

The project hosts multiple web applications as sub-routes within a single Next.js app, avoiding the need for multiple domains.

## Build Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

There are **no test files** in this project currently.

## Code Style Guidelines

### TypeScript

- Use **strict mode** (enabled in tsconfig.json)
- Always define explicit types for function parameters and return values
- Use `Readonly` for props objects in component definitions
- Enable strict null checks - avoid `any` types

### File Organization

```
app/                    # Next.js App Router pages
├── components/         # Reusable UI components
│   ├── header/         # Header-specific components
│   ├── auth/           # Authentication components
│   └── shared/         # Shared/common components
├── css/                # Stylesheets
├── auth/               # Auth-related pages
└── [other routes]/     # Feature pages

lib/                    # Utility functions and helpers
```

### Imports

- Use path aliases: `@/*` maps to project root
- Order imports: external libs → internal libs → local components
- Use named exports for utilities, default exports for components

### Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`, `ConditionalHeader.tsx`)
- **Files/Utilities**: camelCase (e.g., `api-client.ts`, `permissions.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth`)
- **Constants**: UPPER_SNAKE_CASE for config values

### React Patterns

- Add `"use client"` directive at top of client components
- Use functional components with arrow functions or `function` keyword
- Extract complex logic into custom hooks
- Use early returns for conditionals
- Memoize expensive computations with `useMemo`/`useCallback`

### Tailwind CSS

- Use dark mode classes: `dark:bg-dark`, `dark:text-darklink`
- Theme colors: `primary`, `secondary`, use CSS variables
- Use `aria-label` for accessibility on icon-only buttons
- Prefer Tailwind over custom CSS

### Error Handling

- Always wrap async operations in try/catch
- Throw descriptive errors: `throw new Error("meaningful message")`
- Handle API errors gracefully with user feedback
- Use TypeScript's `unknown` type for caught errors before handling

### Authentication

- Use Clerk for auth: `@clerk/nextjs` components and hooks
- Server components: use `auth()` from `@clerk/nextjs/server`
- Client components: use `useAuth` hook
- API routes: wrap with `auth()` middleware check
- Use `fetchWithAuth` utility from `lib/api-client.ts` for authenticated requests

### Next.js Specific

- Use App Router (all files in `app/` directory)
- Define metadata in `layout.tsx` or `page.tsx`
- Use Server Components by default, add `"use client"` only when needed
- Leverage Next.js built-in optimizations (Image, Font, Link)

### ESLint

The project uses `eslint-config-next` with TypeScript support. Run `npm run lint` to check for issues.

### What NOT to Do

- Do NOT commit `.env` files or secrets
- Do NOT use `console.log` in production code
- Do NOT use `any` type unless absolutely necessary
- Do NOT commit to main directly (use branches)
- Do NOT include `.next/`, `node_modules/`, or `build/` in commits

### Useful Patterns

**Client Component:**
```tsx
"use client";
import { useState } from "react";

export default function Component() {
  const [state, setState] = useState(false);
  return <div>{state ? "yes" : "no"}</div>;
}
```

**Server Component with Auth:**
```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  return <div>Protected content</div>;
}
```

**API Request:**
```tsx
import { fetchWithAuth } from "@/lib/api-client";

const data = await fetchWithAuth("/api/endpoint");
```
