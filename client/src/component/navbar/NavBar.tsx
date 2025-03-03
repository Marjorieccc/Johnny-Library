import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {
  // track which dropdown is active (if any)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle keyboard interaction and focus management
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeDropdown === "explore") {
          setActiveDropdown(null);
          exploreButtonRef.current?.focus();
        } else if (activeDropdown === "service") {
          setActiveDropdown(null);
          serviceButtonRef.current?.focus();
        }
      }
    };

    // Handle clicks outside to close dropdown
    function handleClickOutside(event: MouseEvent) {
      // Check if the click was outside both dropdowns and their buttons
      const isExploreOutsideClick =
        exploreButtonRef.current &&
        exploreDropdownRef.current &&
        !exploreButtonRef.current.contains(event.target as Node) &&
        !exploreDropdownRef.current.contains(event.target as Node);

      const isServiceOutsideClick =
        serviceButtonRef.current &&
        serviceDropdownRef.current &&
        !serviceButtonRef.current.contains(event.target as Node) &&
        !serviceDropdownRef.current.contains(event.target as Node);

      if (activeDropdown === "explore" && isExploreOutsideClick) {
        setActiveDropdown(null);
      } else if (activeDropdown === "service" && isServiceOutsideClick) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Handle keyboard navigation within dropdowns
  function handleExploreKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveDropdown(activeDropdown === "explore" ? null : "explore");
    } else if (event.key === "ArrowDown" && activeDropdown === "explore") {
      event.preventDefault();
      const dropdown = document.getElementById("explore-dropdown");
      const firstLink = dropdown?.querySelector("a");
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
    }
  }

  function handleServiceKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveDropdown(activeDropdown === "service" ? null : "service");
    } else if (event.key === "ArrowDown" && activeDropdown === "service") {
      event.preventDefault();
      const dropdown = document.getElementById("service-dropdown");
      const firstLink = dropdown?.querySelector("a");
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
    }
  }

  return (
    <nav aria-label="Main navigation">
      <ul className="items-center justify-end flex-1 lg:flex lg:ml-5">
        {/* Explore Tab */}
        <li className="mr-3 lg:py-0">
          <div className="relative">
            <button
              ref={exploreButtonRef}
              tabIndex={0}
              role="button"
              aria-expanded={activeDropdown === "explore"}
              aria-haspopup="menu"
              aria-controls="explore-dropdown"
              className="relative inline-block px-0 m-2 text-sm text-gray-600 dropdown font-fjalla hover:text-gray-900 focus:outline-none focus:ring focus:ring-primary-red focus:text-gray-900 rounded p-1 group"
              onKeyDown={handleExploreKeyDown}
              onClick={() => {
                // Toggle this dropdown, close others
                setActiveDropdown(
                  activeDropdown === "explore" ? null : "explore"
                );
              }}
              onMouseEnter={() => {
                setActiveDropdown("explore");
              }}
            >
              Explore!
              <span
                className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 
                           group-hover:w-full group-hover:transition-all transform -translate-x-1/2"
              ></span>
            </button>

            {activeDropdown === "explore" && (
              <div
                ref={exploreDropdownRef}
                className="absolute z-50"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Dropdown
                  navString="explore"
                  id="explore-dropdown"
                  onClose={() => setActiveDropdown(null)}
                />
              </div>
            )}
          </div>
        </li>

        {/* Service Tab */}
        <li className="py-2 mr-3 lg:py-0">
          <div className="relative">
            <button
              ref={serviceButtonRef}
              tabIndex={0}
              role="button"
              aria-expanded={activeDropdown === "service"}
              aria-haspopup="menu"
              aria-controls="service-dropdown"
              className="relative inline-block px-4 m-2 text-sm text-gray-600 dropdown font-fjalla hover:text-gray-900 focus:outline-none focus:ring focus:ring-primary-red focus:text-gray-900 rounded p-1 group"
              onKeyDown={handleServiceKeyDown}
              onClick={() => {
                // Toggle this dropdown, close others
                setActiveDropdown(
                  activeDropdown === "service" ? null : "service"
                );
              }}
              onMouseEnter={() => {
                setActiveDropdown("service");
              }}
            >
              Service
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-900 group-hover:w-full group-hover:transition-all transform -translate-x-1/2"></span>
            </button>

            {activeDropdown === "service" && (
              <div
                ref={serviceDropdownRef}
                className="absolute z-50"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Dropdown
                  navString="service"
                  id="service-dropdown"
                  onClose={() => setActiveDropdown(null)}
                />
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
