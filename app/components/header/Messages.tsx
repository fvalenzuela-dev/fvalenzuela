"use client";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { messagesData } from "./headerData";

const Messages = () => {
  return (
    <Menu as="div" className="relative group/menu">
      <MenuButton className="relative w-10 h-10 group-hover/menu:bg-lightprimary/40 dark:group-hover/menu:bg-white/10 flex items-center justify-center rounded-full transition-all duration-150">
        <span className="relative text-link dark:text-darklink rounded-full flex justify-center items-center cursor-pointer group-hover/menu:text-primary dark:group-hover/menu:text-darklink transition-colors duration-150">
          <Icon icon="solar:bell-bold-duotone" height={20} />
        </span>
        <span className="rounded-full absolute right-1 top-1 text-[10px] h-2 w-2 bg-error shadow-md ring-2 ring-white dark:ring-dark flex justify-center items-center"></span>
      </MenuButton>

      <MenuItems className="ui-dropdown-animation absolute right-0 mt-3 w-screen sm:w-[500px] ui-dropdown-notifications max-h-[500px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center px-6 py-4 justify-between border-b border-border dark:border-darkborder">
          <div>
            <h3 className="text-base font-bold text-dark dark:text-white mb-0.5">
              Notifications
            </h3>
            <p className="text-xs text-link dark:text-darklink font-medium">
              You have 5 unread messages
            </p>
          </div>
          <span className="px-2.5 py-1 bg-lightsecondary dark:bg-lightsecondary text-secondary text-xs font-semibold rounded-md">
            5 new
          </span>
        </div>

        {/* Notifications List */}
        <div className="overflow-auto flex-1">
          {messagesData.map((message, index) => (
            <MenuItem key={index}>
              <Link
                href="#"
                className="px-6 py-4 flex gap-4 items-start hover:bg-lightgray hover:dark:bg-darkgray group/link w-full transition-colors duration-150 border-b border-border dark:border-darkborder last:border-b-0"
              >
                <div className="flex-shrink-0 relative w-11 h-11 rounded-full bg-lightprimary dark:bg-white/10 flex items-center justify-center">
                  <span className="text-primary dark:text-white font-bold text-base">
                    {message.title.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-dark dark:text-white group-hover/link:text-primary dark:group-hover/link:text-darklink transition-colors duration-150 mb-1">
                    {message.title}
                  </h5>
                  <p className="text-xs text-link dark:text-darklink font-medium line-clamp-2">
                    {message.subtitle}
                  </p>
                  <span className="text-xs text-link dark:text-darklink font-medium mt-1 inline-block">
                    2 min ago
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </Link>
            </MenuItem>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border dark:border-darkborder">
          <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white rounded-md py-2.5 px-5 text-center font-semibold text-sm transition-all duration-150">
            View All Notifications
          </button>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Messages;
