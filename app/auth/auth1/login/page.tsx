import React from "react";
import SocialButtons from "@/app/components/auth/SocialButtons";
import AuthLogin from "@/app/components/auth/AuthLogin";
import LeftSidebarPart from "@/app/components/auth/LeftSidebarPart";
import FullLogo from "@/app/components/shared/FullLogo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - FValenzuela",
  description: "Inicia sesion en FValenzuela",
};

const LoginAuth1 = () => {
  return (
    <>
      <div className="p-6 lg:bg-transparent lg:dark:bg-transparent bg-lightprimary/50 lg:fixed top-0 z-50 w-full backdrop-blur-sm">
        <FullLogo />
      </div>
      <div className="relative overflow-hidden h-screen">
        <div className="grid grid-cols-12 gap-0 h-screen bg-white dark:bg-dark">
          {/* Left Side - Trust Metrics (60%) */}
          <div className="xl:col-span-7 lg:col-span-6 col-span-12 bg-lightprimary/60 dark:bg-darkinfo/20 lg:block hidden relative overflow-hidden">
            <LeftSidebarPart />
          </div>

          {/* Right Side - Login Form (40%) */}
          <div className="xl:col-span-5 lg:col-span-6 col-span-12 flex items-center justify-center px-8 py-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-base text-link dark:text-darklink font-medium">
                  Accede a tu portafolio y aplicaciones
                </p>
              </div>

              {/* Social Buttons */}
              <SocialButtons title="or continue with email" />

              {/* Login Form */}
              <AuthLogin />

              {/* Sign up link */}
              <div className="flex gap-2 text-base text-link dark:text-darklink font-medium mt-8 items-center justify-center pt-6 border-t border-border dark:border-darkborder">
                <p>Nuevo en FValenzuela?</p>
                <Link
                  href="/auth/auth1/register"
                  className="ui-link text-sm"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAuth1;
