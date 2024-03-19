import React,  { useState } from 'react';
import Title from './title';
import NavBar from '../navbar/navBar';
import SearchBar from '../searchBar/searchBar'
import AccountLoginButton from '../account/accountLoginButton';
import ReserveCheckButton from '../account/reserveCheckButton';

export default function Header() {

  return (
    <div className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
        <div className="container mx-auto flex items-center justify-between py-4 space-x-4"> 
          <Title />
          <div className="flex-grow"></div>
          <div className="flex-grow flex items-center space-x-4">
          <SearchBar/>
          <AccountLoginButton/>
          <ReserveCheckButton/>
          </div>

        </div>
        <div className="container mx-auto flex items-center justify-between py-1 space-x-4"> 
          <NavBar />
        </div>
      </div>
  );
}
