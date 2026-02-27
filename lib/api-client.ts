/**
 * API Client with Clerk Authentication
 * 
 * This utility helps make authenticated requests to your Python backend
 * by automatically including the Clerk session token in the headers.
 */

import { auth } from "@clerk/nextjs/server";

/**
 * Make an authenticated API request to your Python backend
 * 
 * Usage:
 * ```typescript
 * const data = await fetchWithAuth('/api/endpoint');
 * ```
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Client-side version using useAuth hook
 * Use this in Client Components
 */
export function createAuthenticatedFetch(getToken: () => Promise<string | null>) {
  return async function (endpoint: string, options: RequestInit = {}) {
    const token = await getToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  };
}
