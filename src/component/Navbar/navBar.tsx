import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";

type NavbarProps = {
    onSearch: (term: string) => void;
  };
  

export default function Navbar({ onSearch }: NavbarProps) {

    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const exploreDropdownRef = useRef<HTMLDivElement>(null);
    const serviceDropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(e.target as Node)) {
            setIsExploreOpen(false);
          }
          if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target as Node)) {
            setIsServiceOpen(false);
          }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleExploreClick = () => {
        setIsExploreOpen(!isExploreOpen);
        setIsServiceOpen(false); 
      };
    
      const handleServiceClick = () => {
        setIsServiceOpen(!isServiceOpen);
        setIsExploreOpen(false);
      };
    

  return (
    <nav className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
            <div className="flex items-center flex-1">
            <MainHeader />
            </div>

            <SearchBar onSearch={onSearch} />

            <ul className="list-reset lg:flex justify-end items-center flex-1">
                <li className="mr-3 py-2 lg:py-0">
                    <div tabIndex={0} role="button" className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4" onClick={handleExploreClick} ref={exploreDropdownRef}>Explore!</div>
                    {isExploreOpen && (
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-lg w-full absolute left-0 right-0">
                        <li><a>Fiction</a></li>
                        <li><a>Non-Fiction</a></li>
                        </ul>
                    )}
                </li>
                <li className="mr-3 py-2 lg:py-0">
                <div tabIndex={0} role="button" className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4" onClick={handleServiceClick} ref={serviceDropdownRef}>Service</div>
                    {isServiceOpen && (
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-lg w-full absolute left-0 right-0">
                            <li><a>Book Study Room</a></li>
                            <li><a>Book a Computer</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    </nav>
  );
};


