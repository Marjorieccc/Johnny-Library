import { ReactNode, useState } from "react";

type ModalProps = {
  modalContent: ReactNode;
  header?: ReactNode;
  buttonContent: ReactNode;
  buttonCss?: string;
  modalCss?: string;
};

export default function Modal({
  modalContent,
  buttonContent,
  buttonCss,
  header,
  modalCss,
}: ModalProps) {
  const [isModalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        id="menu-toggle"
        onClick={() => setModalShow(true)}
        className={
          buttonCss
            ? buttonCss
            : "flex w-full appearance-none justify-center rounded border border-gray-400 bg-white px-3 py-3 font-medium hover:cursor-pointer hover:border-gray-400 hover:bg-gray-100 focus:outline-none lg:hidden lg:bg-transparent"
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
        >
          <div
            id="modal-content"
            onClick={(e) => e.stopPropagation()}
            className={
              modalCss
                ? "fixed shadow-2xl ".concat(modalCss)
                : "fixed h-full min-w-80 max-w-lg bg-white p-5 shadow-2xl"
            }
          >
            <div className="flex items-center justify-between pb-3">
              {/* Header */}
              {header}
              {/* Close Button */}
              <button
                className="box-content absolute top-0 right-0 mt-5 mr-5 border-none rounded-none text-neutral-500 hover:cursor-pointer hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                onClick={() => setModalShow(false)}
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
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
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
}
