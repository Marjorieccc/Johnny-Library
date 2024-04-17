import React from "react";
import Title from "./title";
import NavBar from "../navbar/navBar";
import SearchBar from "../searchBar/searchBar";
import LogoutBtn from "../account/logoutBtn";
import LoginBtn from "../account/loginBtn";

import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="flex justify-center w-full max-w-2xl mx-auto">
    <div className="fixed top-0 z-10 w-full bg-white border-b border-gray-400">
      <div className="flex items-center pt-4 space-x-4 lg:px-10">
        <Title />
        <div className="flex flex-grow"></div>
        <div className="hidden lg:flex lg:flex-grow ">
            <SearchBar/>
         </div>
            
        <div className="flex items-center flex-grow space-x-2">
            <span>{isAuthenticated ? user && user.name : "Guest "} </span>
            <LoginBtn />
            {/* <ReserveCheckButton /> */}
            {isAuthenticated && <LogoutBtn />}
        </div>
      </div>
      <div className="mx-4 my-2 lg:hidden">
            <SearchBar/>
        </div>
       {/* Hide when screen size = sm */}
      <div className="items-center justify-between hidden py-1 mx-auto space-x-4 lg:flex ">
        <NavBar />
      </div>
    </div>
    </div>
  );
}
