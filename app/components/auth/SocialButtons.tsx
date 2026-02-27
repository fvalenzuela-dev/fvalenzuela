"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

interface SocialButtonsProps {
  title?: string;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ title }) => {
  return (
    <>
      <div className="flex gap-4 my-7">
        <Link
          href="/"
          className="group px-4 py-3 border border-border dark:border-darkborder flex gap-2.5 items-center w-full rounded-md text-center justify-center text-link dark:text-darklink font-medium hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 hover:bg-lightprimary/20 dark:hover:bg-lightprimary/10 transition-all duration-150"
        >
          <Icon icon="logos:google-icon" width={20} />
          <span>Google</span>
        </Link>
        <Link
          href="/"
          className="group px-4 py-3 border border-border dark:border-darkborder flex gap-2.5 items-center w-full rounded-md text-center justify-center text-link dark:text-darklink font-medium hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 hover:bg-lightprimary/20 dark:hover:bg-lightprimary/10 transition-all duration-150"
        >
          <Icon icon="logos:facebook" width={20} />
          <span>Facebook</span>
        </Link>
      </div>
      {/* Divider */}
      <div className="flex items-center gap-4 my-7">
        <div className="flex-1 border-t border-border dark:border-darkborder"></div>
        <span className="text-sm font-medium text-darklink dark:text-darklink uppercase tracking-wide">
          {title}
        </span>
        <div className="flex-1 border-t border-border dark:border-darkborder"></div>
      </div>
    </>
  );
};

export default SocialButtons;
