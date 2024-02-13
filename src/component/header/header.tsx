import React from "react";
import { useState } from 'react';
import Title from "./title";
import NavBar from "../navbar/navBar";
import SearchBar from "../searchBar/searchBar"

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term: string) => {setSearchTerm(term);};

  return (
      <div className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4"> 
          <Title />
          <SearchBar onSearch= {handleSearch}/>
          <NavBar />
        </div>
      </div>
  );
}
