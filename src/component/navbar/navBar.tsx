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
    <nav>
      <ul className="list-reset lg:flex justify-end items-center flex-1">
        <li className="mr-3  lg:py-0 ">
          <div
            onMouseEnter={handleExploreHover}
            onMouseLeave={handleExploreHover}
            className="relative group">
              <div tabIndex={0} role="button" className=" dropdown font-fjalla inline-block text-gray-600 text-sm px-4 m-2 
                                                        hover:text-gray-900 relative group">
                Explore!
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 
                                 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span> 
              </div>
                {isExploreDropdownVisible && <Dropdown navString="explore" />}
          </div>
        </li>
        <li className="mr-3 py-2 lg:py-0">
          <div
            onMouseEnter={handleServiceHover}
            onMouseLeave={handleServiceHover}
            className="relative group">
            <div tabIndex={0} role="button" className="dropdown font-fjalla inline-block text-gray-600 text-sm px-4 m-2 hover:text-gray-900 relative group">
              Service
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span> {/* Adjusted width and centering */}
            </div>
                {isServiceDropdownVisible && <Dropdown navString="service" />}
          </div>
        </li>
      </ul>
    </nav>
  );
}
