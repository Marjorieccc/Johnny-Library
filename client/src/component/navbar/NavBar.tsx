// Revised NavBar.tsx with accessibility improvements
import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const [isExploreDropdownVisible, setExploreDropdownVisible] = useState(false);
  const [isServiceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const leaveExploreTimeout = useRef<number | null>(null);
  const leaveServiceTimeout = useRef<number | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard interaction and focus management
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isExploreDropdownVisible) {
          setExploreDropdownVisible(false);
          exploreButtonRef.current?.focus();
        }
        if (isServiceDropdownVisible) {
          setServiceDropdownVisible(false);
          serviceButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isExploreDropdownVisible, isServiceDropdownVisible]);

  const handleExploreHover = () => {
    if (isExploreDropdownVisible) {
      leaveExploreTimeout.current = window.setTimeout(() => {
        setExploreDropdownVisible(false);
      }, 1000);
    } else {
      if (leaveExploreTimeout.current) {
        clearTimeout(leaveExploreTimeout.current);
        leaveExploreTimeout.current = null;
      }
      setServiceDropdownVisible(false);
      setExploreDropdownVisible(true);
    }
  };

  const handleServiceHover = () => {
    if (isServiceDropdownVisible) {
      leaveServiceTimeout.current = window.setTimeout(() => {
        setServiceDropdownVisible(false);
      }, 1000);
    } else {
      if (leaveServiceTimeout.current) {
        clearTimeout(leaveServiceTimeout.current);
        leaveServiceTimeout.current = null;
      }
      setExploreDropdownVisible(false);
      setServiceDropdownVisible(true);
    }
  };

  // Handle keyboard activation of dropdown menus
  const handleExploreKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setServiceDropdownVisible(false);
      setExploreDropdownVisible(!isExploreDropdownVisible);
    } else if (event.key === "ArrowDown" && isExploreDropdownVisible) {
      event.preventDefault();
      const dropdown = document.getElementById("explore-dropdown");
      const firstLink = dropdown?.querySelector("a");
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
    }
  };

  const handleServiceKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExploreDropdownVisible(false);
      setServiceDropdownVisible(!isServiceDropdownVisible);
    } else if (event.key === "ArrowDown" && isServiceDropdownVisible) {
      event.preventDefault();
      const dropdown = document.getElementById("service-dropdown");
      const firstLink = dropdown?.querySelector("a");
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
    }
  };

  return (
    <nav aria-label="Main navigation">
      <ul className="items-center justify-end flex-1 lg:flex lg:ml-5">
        {/* Resources Tab */}
        <li className="mr-3 lg:py-0">
          <div
            onMouseEnter={handleExploreHover}
            onMouseLeave={handleExploreHover}
            onFocus={handleExploreHover}
            onBlur={handleExploreHover}
          >
            <button
              ref={exploreButtonRef}
              tabIndex={0}
              role="button"
              aria-expanded={isExploreDropdownVisible}
              aria-haspopup="menu"
              aria-controls="explore-dropdown"
              className="relative inline-block px-0 m-2 text-sm text-gray-600 dropdown font-fjalla hover:text-gray-900 focus:outline-none focus:ring focus:ring-primary-red focus:text-gray-900 rounded p-1 group"
              onKeyDown={handleExploreKeyDown}
              onClick={() => {
                setServiceDropdownVisible(false);
                setExploreDropdownVisible(!isExploreDropdownVisible);
              }}
            >
              Explore!
              <span
                className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 
                             group-hover:w-full group-hover:transition-all transform -translate-x-1/2"
              ></span>
            </button>
            {isExploreDropdownVisible && (
              <Dropdown
                navString="explore"
                id="explore-dropdown"
                onClose={() => setExploreDropdownVisible(false)}
              />
            )}
          </div>
        </li>
        {/* Service Tab */}
        <li className="py-2 mr-3 lg:py-0">
          <div
            onMouseEnter={handleServiceHover}
            onMouseLeave={handleServiceHover}
            onFocus={handleServiceHover}
            onBlur={handleServiceHover}
          >
            <button
              ref={serviceButtonRef}
              tabIndex={0}
              role="button"
              aria-expanded={isServiceDropdownVisible}
              aria-haspopup="menu"
              aria-controls="service-dropdown"
              className="relative inline-block px-4 m-2 text-sm text-gray-600 dropdown font-fjalla hover:text-gray-900 focus:outline-none focus:ring focus:ring-primary-red focus:text-gray-900 rounded p-1 group"
              onKeyDown={handleServiceKeyDown}
              onClick={() => {
                setExploreDropdownVisible(false);
                setServiceDropdownVisible(!isServiceDropdownVisible);
              }}
            >
              Service
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span>
            </button>
            {isServiceDropdownVisible && (
              <Dropdown
                navString="service"
                id="service-dropdown"
                onClose={() => setServiceDropdownVisible(false)}
              />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
