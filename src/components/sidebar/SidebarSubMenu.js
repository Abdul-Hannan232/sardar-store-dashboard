import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';

import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from 'react-icons/io5';

const SidebarSubMenu = ({ route }) => {
  const [open, setOpen] = useState(false);

  const handleSubMenu = () => setOpen(!open);

  return (
    <>
      <li className="relative px-6 py-3" key={route.name}>
        <button
          className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-green-600 dark:hover:text-gray-200"
          onClick={handleSubMenu}
          aria-haspopup="true"
        >
          <span className="inline-flex items-center">
            {/* <route.icon className="w-5 h-5" aria-hidden="true" /> */}
            <span className="ml-4 mt-1">{route.name}</span>
            <span className="pl-4 mt-1">
              {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          </span>
        </button>
        {open && (
          <ul
            className="p-2  overflow-hidden text-sm font-medium text-gray-500 rounded-md dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu"
          >
            {route.routes.map((child, i) => (
              <li key={i + 1}>
                <NavLink
                  to={child.path}
                  className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-green-300 cursor-pointer"
                  activeClassName="text-green-300 dark:text-gray-100"
                >
                  <Route path={child.path} exact={route.exact}>
                    <span
                      // className="absolute inset-y-0 left-0 w-1 bg-green-600 rounded-tr-lg rounded-br-lg"
                      className="absolute inset-y-0 left-0 w-1 base-bg-color rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <span className="text-xs text-gray-500 pr-1">
                    <IoRemoveSharp />
                  </span>
                  <span className="text-gray-500 hover:text-green-600 dark:hover:text-gray-200">
                    {child.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default SidebarSubMenu;
