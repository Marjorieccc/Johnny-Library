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
      ref={dropdownRef}
      role="menu"
      tabIndex={0}
      className="py-3 text-base text-gray-700"
      aria-label={`${navString} navigation menu`}
    >
      {/* Explore Tab */}
      {navString === "explore" && (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-600 border-b border-gray-200 pb-1 mb-3">
                By Category
              </h3>
              <ul
                className="space-y-3 mt-3"
                role="group"
                aria-label="By Category"
              >
                <li role="menuitem">
                  <Link
                    to="/explore"
                    className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
                  >
                    <span className="ml-2">Fiction</span>
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    to="/explore"
                    className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
                  >
                    <span className="ml-2">Non-Fiction</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-600 border-b border-gray-200 pb-1 mb-3">
                By Format
              </h3>
              <ul
                className="space-y-3 mt-3"
                role="group"
                aria-label="By Format"
              >
                <li role="menuitem">
                  <Link
                    to="/explore"
                    className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
                  >
                    <span className="ml-2">Books</span>
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    to="/explore"
                    className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
                  >
                    <span className="ml-2">Movies & TV</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Service Tab */}
      {navString === "service" && (
        <div className="p-4">
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-600 border-b border-gray-200 pb-1 mb-3">
            Library Services
          </h3>
          <ul
            className="space-y-3 mt-3"
            role="group"
            aria-label="Library Services"
          >
            <li role="menuitem">
              <Link
                to="/services/rooms"
                className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
              >
                <span className="ml-2">Book Study Room</span>
              </Link>
            </li>
            <li role="menuitem">
              <Link
                to="/services"
                className="flex items-center px-3 py-2 text-base rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors duration-150 focus:outline-none focus:ring focus:ring-primary-red"
              >
                <span className="ml-2">Book a Computer</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </ul>
  );
}
