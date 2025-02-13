import Title from "./Title";
import NavBar from "../navbar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import LogoutBtn from "../account/LogoutBtn";
import LoginBtn from "../account/LoginBtn";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="fixed top-0 z-10 w-full bg-white border-b border-gray-400 max-w-screen-2xl">
        <div className="flex items-center w-full px-4 pt-4 space-x-4">
          <Title />
          <div className="flex flex-grow">
            <div className="flex-grow hidden lg:flex ">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center space-x-4 font-fjalla">
            <span className="text-red-800">{isAuthenticated ? user && user.name : "Guest "}</span>
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
