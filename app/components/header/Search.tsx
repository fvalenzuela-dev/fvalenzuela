"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { searchLinks } from "./headerData";

const Search = () => {
  const [openBox, setOpenBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredLinks = searchLinks.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setOpenBox(true);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setOpenBox(false), 200);
          }}
          onChange={handleChange}
          placeholder="Search pages..."
          className={`w-full border rounded-lg py-2.5 pl-11 pr-4 bg-transparent dark:text-white text-sm font-medium transition-all duration-150 focus:ring-0 focus:shadow-none ${
            isFocused
              ? "border-primary dark:border-primary"
              : "border-border dark:border-darkborder"
          }`}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
          <Icon
            icon="solar:magnifer-bold-duotone"
            height={20}
            className={`transition-colors duration-150 ${
              isFocused
                ? "text-primary"
                : "text-link dark:text-darklink"
            }`}
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setOpenBox(false);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-link dark:text-darklink hover:text-primary transition-colors duration-150"
          >
            <Icon icon="solar:close-circle-bold" height={18} />
          </button>
        )}
      </div>
      
      {openBox && searchQuery && (
        <div className="absolute top-full left-0 mt-2 shadow-md dark:shadow-dark-md w-full bg-white dark:bg-dark rounded-lg z-50 border border-border dark:border-darkborder overflow-hidden">
          <div className="max-h-80 overflow-auto">
            <div className="px-4 py-3 border-b border-border dark:border-darkborder">
              <h5 className="text-sm font-bold text-dark dark:text-white">
                Quick Page Links
              </h5>
              <p className="text-xs text-link dark:text-darklink font-medium mt-0.5">
                {filteredLinks.length} result{filteredLinks.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className={`${filteredLinks.length > 0 ? "py-2" : "py-8"}`}>
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => (
                  <Link
                    href={link.href}
                    className="px-4 py-3 flex items-start gap-3 group hover:bg-lightgray hover:dark:bg-darkgray transition-colors duration-150"
                    key={index}
                  >
                    <div className="w-8 h-8 rounded-lg bg-lightprimary dark:bg-darkinfo flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon 
                        icon="solar:document-text-bold-duotone" 
                        className="text-primary" 
                        width={18} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="group-hover:text-primary dark:group-hover:text-darklink font-semibold text-sm text-dark dark:text-white transition-colors duration-150">
                        {link.title}
                      </h6>
                      <p className="text-xs text-link dark:text-darklink font-medium mt-0.5 truncate">
                        {link.href}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center px-4">
                  <Icon 
                    icon="solar:inbox-line-bold-duotone" 
                    className="text-link dark:text-darklink mx-auto mb-2" 
                    width={40} 
                  />
                  <p className="text-sm text-link dark:text-darklink font-medium">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
