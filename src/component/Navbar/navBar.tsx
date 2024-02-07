import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";

export default function NavBar() {
  return (
    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
      <div className="pl-4 flex items-center">
        <Link
          to="/"
          className="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl"
        >
          Unionville Library
        </Link>
      </div>
      
      {/* Hidden menu for small screen users */}
      <div className="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-purple-500 appearance-none focus:outline-none"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menu for large screen */}
      <div className="w-full flex-grow lg:flex lg:content-center lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 z-20">
        <SearchBar />
        <ul className="list-reset lg:flex justify-end items-center">
          <li className="mr-3 py-2 lg:py-0">
            <Link
              to="/"
              className="inline-block py-2 px-4 text-gray-900 font-bold no-underline"
            >
              Home
            </Link>
          </li>
          <li className="mr-3 py-2 lg:py-0">
            <details>
              <summary>
                <Link to="explore" className="mr-3 py-2 lg:py-0">
                  Explore
                </Link>
              </summary>
              <ul>
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="explore"
                    className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4"
                  >
                    Book Category 1
                  </Link>
                </li>
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="explore"
                    className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4"
                  >
                    Book Category 2
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
