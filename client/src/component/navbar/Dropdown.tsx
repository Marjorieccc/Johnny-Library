import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

type DropdownProps = {
  navString: string;
  id?: string;
  onClose?: () => void;
};

export default function Dropdown({ navString, id, onClose }: DropdownProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Focus management for keyboard navigation
  useEffect(() => {
    // Handle keyboard events within the dropdown
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      } else if (event.key === "Tab") {
        // Check if we're tabbing out of the dropdown
        const focusable =
          dropdownRef.current?.querySelectorAll("a, button") || [];
        const firstFocusable = focusable[0] as HTMLElement;
        const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstFocusable) {
          if (onClose) onClose();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastFocusable
        ) {
          if (onClose) onClose();
        }
      }
    };

    dropdownRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      dropdownRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <ul
      id={id}
      role="menu"
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 bg-white absolute left-0 right-0 top-full mt-1 font-roboto-condensed w-screen"
      aria-label={`${navString} navigation menu`}
    >
      {/* Explore Tab */}
      {navString === "explore" && (
        <div className="flex">
          <div className="mr-4 ">
            <ul className="list-none" role="group" aria-label="By Category">
              <li
                className="block px-4 py-2 font-extrabold"
                role="presentation"
              >
                BY CATEGORY
              </li>
              <li role="menuitem">
                <Link
                  to="/explore"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Fiction
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/explore"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Non-Fiction
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-5 mr-4">
            <ul className="list-none" role="group" aria-label="By Format">
              <li
                className="block px-4 py-2 font-extrabold"
                role="presentation"
              >
                BY FORMAT
              </li>
              <li role="menuitem">
                <Link
                  to="/explore"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Books
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/explore"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Movies & TV
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Service Tab */}
      {navString === "service" && (
        <div className="flex">
          <div className="px-10 mr-4">
            <ul
              className="list-none"
              role="group"
              aria-label="Library Services"
            >
              <li role="menuitem">
                <Link
                  to="/services/rooms"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Book Study Room
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/services"
                  className="block px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary-red rounded"
                >
                  Book a Computer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </ul>
  );
}
