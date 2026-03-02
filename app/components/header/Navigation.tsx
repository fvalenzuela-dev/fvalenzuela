"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

interface MenuItem {
  title: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Generador de Ideas",
    href: "/generador-ideas",
  },
  {
    title: "Contacto",
    href: "/contacto",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {menuItems.map((item, index) => {
        const isActive = pathname === item.href;
        
        if (item.title === "Generador de Ideas") {
          return (
            <SignedIn key={index}>
              <Link
                href={item.href}
                className={`relative px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-lightprimary/50 dark:bg-white/10 text-primary dark:text-white"
                    : "text-link dark:text-darklink hover:text-primary dark:hover:text-darklink hover:bg-lightprimary/30 dark:hover:bg-white/10"
                }`}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            </SignedIn>
          );
        }
        
        return (
          <Link
            key={index}
            href={item.href}
            className={`relative px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-150 ${
              isActive
                ? "bg-lightprimary/50 dark:bg-white/10 text-primary dark:text-white"
                : "text-link dark:text-darklink hover:text-primary dark:hover:text-darklink hover:bg-lightprimary/30 dark:hover:bg-white/10"
            }`}
          >
            {item.title}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full"></span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
