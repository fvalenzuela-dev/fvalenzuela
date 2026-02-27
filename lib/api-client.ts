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
function validateEndpoint(endpoint: string): void {
  try {
    const url = new URL(endpoint, "http://localhost");
    if (url.origin !== "http://localhost") {
      throw new Error("Only relative URLs are allowed");
    }
  } catch {
    if (endpoint.includes("://") || endpoint.startsWith("//")) {
      throw new Error("Only relative URLs are allowed");
    }
  }

  if (endpoint.includes("\0")) {
    throw new Error("Invalid endpoint");
  }
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  validateEndpoint(endpoint);

  // eslint-disable-next-line no-restricted-properties
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

    validateEndpoint(endpoint);

    // eslint-disable-next-line no-restricted-properties
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
