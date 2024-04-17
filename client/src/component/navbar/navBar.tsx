import React, { useState, useRef} from 'react';
import Dropdown from './dropdown';


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
      <ul className="items-center justify-end flex-1 lg:flex lg:ml-10">
        <li className="mr-3 lg:py-0 ">
          <div
            onMouseEnter={handleExploreHover}
            onMouseLeave={handleExploreHover}>
              <div tabIndex={0} role="button" className="relative inline-block px-0 m-2 text-sm text-gray-600  dropdown font-fjalla hover:text-gray-900 group">
                Explore!
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 
                                 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span> 
              </div>
                {isExploreDropdownVisible && <Dropdown navString='explore' />}
          </div>
        </li>
        <li className="py-2 mr-3 lg:py-0">
          <div
            onMouseEnter={handleServiceHover}
            onMouseLeave={handleServiceHover}>
            <div tabIndex={0} role="button" className="relative inline-block px-4 m-2 text-sm text-gray-600 dropdown font-fjalla hover:text-gray-900 group">
              Service
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span> {/* Adjusted width and centering */}
            </div>
                {isServiceDropdownVisible && <Dropdown navString='service' />}
          </div>
        </li>
      </ul>
    </nav>
  );
}
