import { ReactNode } from "react";

type DropDownListProps = {
  title: string;
  children: ReactNode;
};

export default function DropDownItems({ title, children }: DropDownListProps) {
  return (
    <li>
      <details>
        <summary
          className="my-1 flex items-center justify-between gap-2 
        pb-2 pt-2 font-medium marker:content-none hover:cursor-pointer"
        >
          <span className="flex gap-2 text-lg">{title}</span>
          <svg
            className="h-3 w-3 text-gray-500 transition group-open:rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </summary>

        <article className="px-4 pb-4">
          <ul id="sidebar-dropdown" className="mt-4 flex flex-col gap-2">
            {children}
          </ul>
        </article>
      </details>
    </li>
  );
}
