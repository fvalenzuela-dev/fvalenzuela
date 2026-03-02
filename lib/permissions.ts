/**
 * Permission System using Clerk Metadata
 * 
 * Permissions are stored in user's publicMetadata in Clerk
 * Example metadata structure:
 * {
 *   "permissions": ["dashboard", "contacto", "admin"]
 * }
 */

import { auth, clerkClient } from "@clerk/nextjs/server";

export type Permission = 
  | "dashboard"
  | "contacto" 
  | "users"
  | "settings"
  | "admin";

/**
 * Check if the current user has a specific permission
 */
export async function hasPermission(permission: Permission): Promise<boolean> {
  const { userId } = await auth();
  
  if (!userId) {
    return false;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const permissions = (user.publicMetadata.permissions as Permission[]) || [];
  
  return permissions.includes(permission);
}

/**
 * Get all permissions for the current user
 */
export async function getUserPermissions(): Promise<Permission[]> {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  return (user.publicMetadata.permissions as Permission[]) || [];
}

/**
 * Check if user has ANY of the provided permissions
 */
export async function hasAnyPermission(permissions: Permission[]): Promise<boolean> {
  const userPermissions = await getUserPermissions();
  return permissions.some(permission => userPermissions.includes(permission));
}

/**
 * Check if user has ALL of the provided permissions
 */
export async function hasAllPermissions(permissions: Permission[]): Promise<boolean> {
  const userPermissions = await getUserPermissions();
  return permissions.every(permission => userPermissions.includes(permission));
}

/**
 * Admin helper - Add permission to a user
 * Call this from an API route
 */
export async function addPermissionToUser(userId: string, permission: Permission) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentPermissions = (user.publicMetadata.permissions as Permission[]) || [];
  
  if (!currentPermissions.includes(permission)) {
    await client.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        permissions: [...currentPermissions, permission],
      },
    });
  }
}

/**
 * Admin helper - Remove permission from a user
 */
export async function removePermissionFromUser(userId: string, permission: Permission) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentPermissions = (user.publicMetadata.permissions as Permission[]) || [];
  
  await client.users.updateUser(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      permissions: currentPermissions.filter(p => p !== permission),
    },
  });
}
