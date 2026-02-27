"use client";
import { usePathname } from "next/navigation";
import Header from "./header/Header";

const publicRoutes = ["/sign-in"];

export default function ConditionalHeader() {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname?.startsWith(route)
  );

  if (isPublicRoute) {
    return null;
  }

  return <Header />;
}
