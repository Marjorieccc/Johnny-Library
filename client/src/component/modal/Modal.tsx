import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { getFocusList, trapFocus } from "../../utils/focus";

type ModalProps = {
  modalContent: ReactNode;
  header?: ReactNode;
  buttonContent: ReactNode;
  buttonCss?: string;
  modalCss?: string;
  modalTitle?: string;
};

// Create a context to a function that closes the modal
export const ModalCloseContext = createContext<(() => void) | null>(null);

export default function Modal({
  modalContent,
  buttonContent,
  buttonCss,
  header,
  modalCss,
  modalTitle = "Modal", // Default title for aria-label
}: ModalProps) {
  const [isModalShow, setModalShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initialFocusRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before modal opened
  useEffect(() => {
    if (isModalShow) {
      initialFocusRef.current = document.activeElement as HTMLElement;

      // Focus the first focusable element in the modal
      const focusableElements = getFocusList(
        modalRef.current,
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else if (initialFocusRef.current) {
      // Return focus to the element that had focus before modal opened
      initialFocusRef.current.focus();
    }
  }, [isModalShow]);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setModalShow(false);
    } else if (e.key === "Tab" && modalRef.current) {
      // Trap focus within modal
      trapFocus(
        e,
        modalRef.current,
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    }
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <button
        id="menu-toggle"
        ref={buttonRef}
        onClick={() => setModalShow(true)}
        aria-haspopup="dialog"
        aria-expanded={isModalShow}
        className={
          buttonCss
            ? buttonCss
            : "flex w-full appearance-none justify-center rounded border border-gray-400 bg-white px-3 py-3 font-medium hover:cursor-pointer hover:border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-focus-blue-500 lg:hidden lg:bg-transparent"
        }
      >
        {buttonContent}
      </button>

      {/* Modal */}
      {isModalShow && (
        <div
          id="bg-overlay"
          onClick={() => {
            setModalShow(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={handleKeyDown}
        >
          <div
            id="modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className={
              modalCss
                ? "fixed shadow-2xl ".concat(modalCss)
                : "fixed h-full min-w-80 max-w-lg bg-white p-5 shadow-2xl"
            }
            tabIndex={-1}
          >
            <div className="flex items-center justify-between pb-3">
              {/* Header */}
              <div id="modal-title">{header}</div>
              {/* Close Button */}
              <button
                className="box-content absolute top-0 right-0 mt-5 mr-5 border-none rounded-none text-gray-700 hover:cursor-pointer hover:text-primary-red hover:no-underline focus:text-primary-red focus:outline-none focus:ring focus:ring-focus-blue-500 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300"
                onClick={() => setModalShow(false)}
                aria-label="Close modal"
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* Content */}
            <ModalCloseContext.Provider value={closeModal}>
              {modalContent}
            </ModalCloseContext.Provider>
          </div>
        </div>
      )}
    </>
  );
}
