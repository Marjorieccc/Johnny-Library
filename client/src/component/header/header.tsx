import React from "react";
import { useState } from 'react';
import Title from "./title";
import NavBar from "../navbar/navBar";
import SearchBar from "../searchBar/searchBar"
import AccountAccess from "../accountAccess";
import ReserveCheck from "../reserveCheck";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term: string) => {setSearchTerm(term);};

  return (
    <div className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
        <div className="container mx-auto flex items-center justify-between py-4 space-x-4"> 
          <Title />
          <div className="flex-grow"></div>
          <div className="flex-grow flex items-center space-x-4">
          <SearchBar onSearch= {handleSearch}/>
          <AccountAccess />
          <ReserveCheck />
          </div>

        </div>
        <div className="container mx-auto flex items-center justify-between py-1 space-x-4"> 
          <NavBar />
        </div>
      </div>
  );
}
