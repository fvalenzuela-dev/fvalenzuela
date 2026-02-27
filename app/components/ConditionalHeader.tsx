"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header/Header";

const publicRoutes = ["/sign-in", "/auth"];

/**
 * Component that conditionally renders the Header based on the current application route.
 * It excludes the header from public authentication routes.
 */
export default function ConditionalHeader(): React.JSX.Element | null {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname?.startsWith(route)
  );

  if (isPublicRoute) {
    return null;
  }

  return <Header />;
}