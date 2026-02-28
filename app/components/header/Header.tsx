"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Search from "./Search";
import Messages from "./Messages";
import Profile from "./Profile";
import Navigation from "./Navigation";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Check if dark mode was previously saved or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    // Apply the class immediately
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        <div className="flex gap-4 items-center min-w-0 flex-1">
          <SignedIn>
            <Search />
          </SignedIn>
        </div>

        {/* Center Section - Navigation Menu */}
        <div className="flex justify-center px-6">
          <Navigation />
        </div>

        {/* Right Section - Actions */}
        <div className="flex gap-4 items-center justify-end flex-1">
          <div className="flex gap-2 items-center pr-4 border-r border-border dark:border-darkborder">
            {/* Theme Toggle */}
            {!isDark ? (
              <button
                className="group w-10 h-10 hover:bg-lightprimary/40 dark:hover:bg-white/10 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink hover:text-primary dark:hover:text-darklink transition-all duration-150"
                onClick={toggleMode}
                aria-label="Switch to dark mode"
              >
                <Icon icon="solar:moon-bold-duotone" width={20} />
              </button>
            ) : (
              <button
                className="group w-10 h-10 hover:bg-lightprimary/40 dark:hover:bg-white/10 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink hover:text-primary dark:hover:text-darklink transition-all duration-150"
                onClick={toggleMode}
                aria-label="Switch to light mode"
              >
                <Icon
                  icon="solar:sun-bold-duotone"
                  width={20}
                />
              </button>
            )}

            {/* Messages/Notifications Dropdown */}
            <SignedIn>
              <Messages />
            </SignedIn>
          </div>

          {/* Authentication with Clerk */}
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/dashboard"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
                Iniciar sesión
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
