"use client";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { profileData } from "./headerData";

const Profile = () => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="group hover:bg-lightprimary/30 dark:hover:bg-white/5 rounded-lg p-2 flex justify-center items-center gap-3 cursor-pointer transition-all duration-150">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          FV
        </div>
        <div className="text-left">
          <h5 className="text-dark dark:text-white text-sm font-semibold group-hover:text-primary dark:group-hover:text-darklink transition-colors duration-150">
            Fernando Valenzuela
          </h5>
          <p className="text-link dark:text-darklink text-xs font-medium">
            Developer
          </p>
        </div>
        <Icon 
          icon="solar:alt-arrow-down-bold" 
          width={16} 
          className="text-link dark:text-darklink group-hover:text-primary dark:group-hover:text-darklink transition-all duration-150 group-hover:translate-y-0.5"
        />
      </MenuButton>

      <MenuItems className="ui-dropdown-animation absolute right-0 mt-3 w-64 ui-dropdown">
        <div className="px-4 py-3 border-b border-border dark:border-darkborder">
          <p className="text-xs font-semibold text-link dark:text-darklink uppercase tracking-wide mb-1">
            Account
          </p>
          <h6 className="text-sm font-bold text-dark dark:text-white">
            Fernando Valenzuela
          </h6>
          <p className="text-xs text-link dark:text-darklink font-medium mt-0.5">
            contacto@fvalenzuela.dev
          </p>
        </div>

        <div className="py-2">
          {profileData.map((item, index) => (
            <MenuItem key={index}>
              <Link href={item.url} className="ui-dropdown-item py-3">
                <div className="w-9 h-9 rounded-lg bg-lightprimary dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon={item.icon} height={20} className="text-primary dark:text-white" />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">{item.title}</h6>
                  <p className="text-xs text-link dark:text-darklink font-medium">{item.subtitle}</p>
                </div>
              </Link>
            </MenuItem>
          ))}
        </div>

        <MenuItem>
          <button className="ui-dropdown-item border-t border-border dark:border-darkborder w-full text-left py-3">
            <div className="w-9 h-9 rounded-lg bg-lighterror/20 dark:bg-error/20 flex items-center justify-center flex-shrink-0">
              <Icon icon="solar:logout-2-bold-duotone" height={20} className="text-error dark:text-error" />
            </div>
            <div>
              <h6 className="text-sm font-semibold">Logout</h6>
              <p className="text-xs text-link dark:text-darklink font-medium">Sign out of account</p>
            </div>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Profile;
