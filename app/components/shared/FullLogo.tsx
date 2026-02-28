import Link from "next/link";
import React from "react";

const FullLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
        <span className="text-white text-lg font-bold">FV</span>
      </div>
      <span className="text-2xl font-bold text-dark dark:text-white">
        FValenzuela
      </span>
    </Link>
  );
};

export default FullLogo;
