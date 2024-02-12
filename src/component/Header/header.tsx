import React from "react";
import NavBar from "../navbar/navBar";

export default function Header() {
  return (
    <header className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
        <NavBar />
      </div>
    </header>
  );
}
