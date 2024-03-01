import React from "react";

import Dropdown from "./dropdown";
import { useState, useRef} from "react";

export default function Navbar() {
  const [isExploreDropdownVisible, setExploreDropdownVisible] = useState(false);
  const [isServiceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const leaveExploreTimeout = useRef<number | null>(null);
  const leaveServiceTimeout = useRef<number | null>(null);


  const handleExploreHover = () => {
    if(isExploreDropdownVisible){ 
      leaveExploreTimeout.current = window.setTimeout(()=>{
        setExploreDropdownVisible(false);
      },1000);
    } 
    else{
      if (leaveExploreTimeout.current) {
        clearTimeout(leaveExploreTimeout.current);
        leaveExploreTimeout.current = null; 
      }
      setServiceDropdownVisible(false);
      setExploreDropdownVisible(true);
    }
  };

  const handleServiceHover = () => {
    if(isServiceDropdownVisible){ 
      leaveServiceTimeout.current = window.setTimeout(()=>{
        setServiceDropdownVisible(false);
      },1000);
    } 
    else{
      if (leaveServiceTimeout.current) {
        clearTimeout(leaveServiceTimeout.current);
        leaveServiceTimeout.current = null; 
      }
      setExploreDropdownVisible(false);
      setServiceDropdownVisible(true);
    }
  };
  

  return (
    <nav>
      <ul className="list-reset lg:flex justify-end items-center flex-1">
        <li className="mr-3  lg:py-0 ">
          <div
            onMouseEnter={handleExploreHover}
            onMouseLeave={handleExploreHover}>
              <div tabIndex={0} role="button" className=" dropdown font-fjalla inline-block text-gray-600 text-sm px-0 m-2 
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
            onMouseLeave={handleServiceHover}>
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
