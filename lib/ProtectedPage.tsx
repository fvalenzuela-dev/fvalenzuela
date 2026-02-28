/**
 * Component to protect pages based on permissions
 */

import { redirect } from "next/navigation";
import { hasPermission, Permission } from "./permissions";

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredPermission: Permission;
  redirectTo?: string;
}

/**
 * Wrapper component for protecting pages
 * 
 * Usage:
 * ```tsx
 * export default async function ContactoPage() {
 *   return (
 *     <ProtectedPage requiredPermission="contacto">
 *       <h1>Contacto Page</h1>
 *     </ProtectedPage>
 *   );
 * }
 * ```
 */
export async function ProtectedPage({
  children,
  requiredPermission,
  redirectTo = "/unauthorized",
}: ProtectedPageProps) {
  const allowed = await hasPermission(requiredPermission);

  if (!allowed) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}

/**
 * Higher-order function to protect pages
 * 
 * Usage:
 * ```tsx
 * const ContactoPage = withPermission("contacto", async () => {
 *   return <h1>Contacto Page</h1>;
 * });
 * 
 * export default ContactoPage;
 * ```
 */
export function withPermission<P extends {}>(
  requiredPermission: Permission,
  Component: React.ComponentType<P>
) {
  return async function ProtectedComponent(props: P) {
    const allowed = await hasPermission(requiredPermission);

    if (!allowed) {
      redirect("/unauthorized");
    }

    return <Component {...props} />;
  };
}
