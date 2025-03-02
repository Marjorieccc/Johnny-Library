import Title from "./Title";
import NavBar from "../navbar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import LogoutBtn from "../account/LogoutBtn";
import LoginBtn from "../account/LoginBtn";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <header className="mx-auto max-w-screen-2xl" role="banner">
      <div className="fixed top-0 z-10 w-full bg-white border-b border-gray-400 max-w-screen-2xl">
        <div className="flex items-center w-full px-4 pt-4 space-x-4">
          <Title />
          <div className="flex flex-grow">
            <div className="flex-grow hidden lg:flex ">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center space-x-4 font-fjalla">
            <span
              className="text-primary-red"
              aria-label={isAuthenticated ? "Logged in as:" : "Not logged in"}
            >
              {isAuthenticated ? user && user.name : "Guest "}
            </span>
            <LoginBtn />
            {isAuthenticated && <LogoutBtn />}
          </div>
        </div>
        <div className="mx-4 my-2 lg:hidden">
          <SearchBar />
        </div>
        <nav
          className="items-center justify-between hidden py-1 mx-auto space-x-4 lg:flex"
          aria-label="Main navigation"
        >
          <NavBar />
        </nav>
      </div>
    </header>
  );
}
