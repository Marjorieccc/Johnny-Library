import React from "react";
import CategoryFilter from "./filterCategories/categoryFilter";

export type HandleChangeProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SideBar({ handleChange }: HandleChangeProps) {
  return (
    <div>
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div className="w-full lg:w-1/5 lg:px-6 text-xl text-gray-800 leading-normal">
          {/* Header */}
          <p className="text-xl font-medium font-bold py-2 lg:pb-6 text-gray-700">
            Filter By:
          </p>

          {/* hidden side bar for small browser*/}
          <div className="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded
             border-gray-600 hover:border-purple-500 appearance-none focus:outline-none"
            >
              <svg
                className="fill-current h-3 float-right"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
          </div>

          {/* Filter Input Section */}
          <div
            className="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden 
          lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20 top:5em;"
            id="menu-content"
          >
            <ul className="list-reset">
              <li>
                <CategoryFilter handleChange={handleChange} />
              </li>
              <li>
                <CategoryFilter handleChange={handleChange} />
              </li>
              <li>
                <CategoryFilter handleChange={handleChange} />
              </li>
              <li>
                <CategoryFilter handleChange={handleChange} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
