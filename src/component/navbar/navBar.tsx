import React from "react";

import Dropdown from "./dropdown";
import { useState } from "react";

export default function Navbar() {
  const [isExploreDropdownVisible, setExploreDropdownVisible] = useState(false);
  const [isServiceDropdownVisible, setServiceDropdownVisible] = useState(false);

  const handleExploreHover = () => {
    setExploreDropdownVisible(!isExploreDropdownVisible);
  };
  const handleServiceHover = () => {
    setServiceDropdownVisible(!isServiceDropdownVisible);
  };

  return (
    <div>
      <ul className="list-reset lg:flex justify-end items-center flex-1">
        <li className="mr-3 py-2 lg:py-0">
          <div
            onMouseEnter={handleExploreHover}
            onMouseLeave={handleExploreHover}>
              <div
              tabIndex={0}
              role="button"
              className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4">
              Explore!
              </div>
                {isExploreDropdownVisible && <Dropdown navString="explore" />}
          </div>
        </li>
        <li className="mr-3 py-2 lg:py-0">
          <div
            onMouseEnter={handleServiceHover}
            onMouseLeave={handleServiceHover}>
              <div
              tabIndex={0}
              role="button"
              className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4">
              Service
              </div>
                {isServiceDropdownVisible && <Dropdown navString="service" />}
          </div>
        </li>
      </ul>
    </div>
  );
}
