import SearchBar from './SearchBar/searchBar';
import Title from './Header/Title';
import Dropdown from './Dropdown';
import {useState } from 'react';

type NavbarProps = {
    onSearch: (term: string) => void;
  };
  
export default function Navbar({ onSearch }: NavbarProps) {

    const [isExploreDropdownVisible, setExploreDropdownVisible] = useState(false);
    const [isServiceDropdownVisible, setServiceDropdownVisible] = useState(false);

    const handleExploreMouseEnter = () => {setExploreDropdownVisible(true);};
    const handleExploreMouseLeave = () => {setExploreDropdownVisible(false);};
    const handleServiceMouseEnter = () => {setServiceDropdownVisible(true);};
    const handleServiceMouseLeave = () => {setServiceDropdownVisible(false);};

  return (
    <nav className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
            <div className="flex items-center flex-1">
                <Title />
            </div>
            
            <SearchBar onSearch={onSearch} />

            <ul className="list-reset lg:flex justify-end items-center flex-1">
                <li className="mr-3 py-2 lg:py-0">
                    <div onMouseEnter={handleExploreMouseEnter}
                         onMouseLeave={handleExploreMouseLeave} 
                         tabIndex={0} role="button" className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4">Explore!</div>
                         {isExploreDropdownVisible && <Dropdown navString="explore" />}
                </li>
                <li className="mr-3 py-2 lg:py-0">
                    <div onMouseEnter={handleServiceMouseEnter}
                         onMouseLeave={handleServiceMouseLeave} 
                         tabIndex={0} role="button" className="dropdown btn m-1 inline-block text-gray-600  hover:text-gray-900 py-2 px-4">Service</div>
                         {isServiceDropdownVisible && <Dropdown navString="service" />}
                </li>
            </ul>
        </div>
    </nav>
  );
};

