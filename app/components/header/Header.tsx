import React, { useState, useEffect } from 'react';
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously saved
    const savedTheme = localStorage.getItem("theme");

    const shouldBeDark = savedTheme === "dark";
    setIsDark(shouldBeDark);

    // Apply the class immediately
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`sticky top-0 z-[10] transition-all duration-200 ${
        isSticky
          ? "shadow-sm bg-white/95 dark:bg-dark/95 backdrop-blur-md border-b border-border dark:border-darkborder"
          : "bg-white dark:bg-dark border-b border-border dark:border-darkborder"
      }`}
    >
      <nav className="flex items-center justify-between px-8 py-4">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Icon icon="lucide:search" width={18} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMode}
            className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle Theme"
          >
            <Icon icon={isDark ? "lucide:sun" : "lucide:moon" } width={20} />
          </button>

          {/* Authentication with Clerk */}
          <SignedIn>
            <UserButton
              afterSignOutUrl="/dashboard"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;