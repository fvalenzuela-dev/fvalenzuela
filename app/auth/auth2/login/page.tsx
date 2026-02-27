import CardBox from "@/app/components/shared/CardBox";
import React from "react";
import SocialButtons from "@/app/components/auth/SocialButtons";
import AuthLogin from "@/app/components/auth/AuthLogin";
import Link from "next/link";
import type { Metadata } from "next";
import FullLogo from "@/app/components/shared/FullLogo";

export const metadata: Metadata = {
  title: "Login - FValenzuela",
  description: "Inicia sesion en FValenzuela",
};

const LoginAuth2 = () => {
  return (
    <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkgray">
      <div className="flex h-full justify-center items-center px-4">
        <CardBox className="md:w-[450px] w-full border-none">
          <div className="mx-auto mb-6">
            <FullLogo />
          </div>

          <h3 className="text-2xl font-bold text-dark dark:text-white text-center">
            Welcome Back
          </h3>
          <p className="text-darklink dark:text-darklink text-sm font-medium text-center mt-2 mb-4">
            Sign in to continue
          </p>

          <SocialButtons title="or sign in with" />
          <AuthLogin />

          <div className="flex gap-2 text-base text-link dark:text-darklink font-medium mt-6 items-center justify-center">
            <p>Nuevo en FValenzuela?</p>
            <Link
              href="/auth/auth2/register"
              className="ui-link text-sm"
            >
              Create an account
            </Link>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default LoginAuth2;
