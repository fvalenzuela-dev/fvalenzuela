"use client";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { languagesData } from "./headerData";

const Language = () => {
  const [currentLang, setCurrentLang] = useState(languagesData[0]);

  return (
    <Menu as="div" className="relative group/menu">
      <MenuButton className="relative w-10 h-10 hover:bg-lightprimary/40 dark:hover:bg-white/5 rounded-full flex justify-center items-center cursor-pointer transition-all duration-150">
        <span className="text-xs font-semibold text-link dark:text-darklink">
          {currentLang.value.toUpperCase()}
        </span>
      </MenuButton>

      <MenuItems className="ui-dropdown-animation absolute right-0 mt-2 w-56 ui-dropdown">
        {languagesData.map((item, index) => (
          <MenuItem key={index}>
            <button
              className="flex gap-3 items-center py-3 px-6 hover:bg-lightgray hover:dark:bg-darkgray group w-full text-left transition-colors duration-150"
              onClick={() => setCurrentLang(item)}
            >
              <span className="w-5 h-5 rounded-full bg-lightsecondary text-secondary flex items-center justify-center text-xs font-semibold">
                {item.value.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm text-muted dark:text-darklink group-hover:text-primary dark:group-hover:text-darklink font-medium">
                {item.flagname}
              </span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Language;
