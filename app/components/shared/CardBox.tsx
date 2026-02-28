import React from "react";

interface CardBoxProps {
  children: React.ReactNode;
  className?: string;
}

const CardBox: React.FC<CardBoxProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-dark rounded-lg shadow-md dark:shadow-dark-md p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default CardBox;
