import React from 'react';
import { Link } from 'react-router-dom';

type DropdownProps ={
    navString: string;
  }

export default function Dropdown({navString}: DropdownProps){
    return(
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2  bg-white w-full absolute left-0 right-0 top-full mt-1 font-roboto-condensed w-screen ">         
        { (navString === 'explore') && 
            <div className="flex">
                <div className="mr-4 px-10 ">
                    <ul className="list-none ">
                        <li className="font-extrabold block px-4 py-2">BY CATEGORY</li>
                        <li><Link to='/explore' className="block px-4 py-2 hover:bg-gray-200">Fiction</Link></li>
                        <li><Link to='/explore' className="block px-4 py-2 hover:bg-gray-200">Non-Fiction</Link></li>
                    </ul>
                 </div>
                 <div className="mr-4 px-5">
                    <ul className="list-none">
                        <li className="font-extrabold block px-4 py-2">BY FORMAT</li>
                        <li><Link to='/explore' className="block px-4 py-2 hover:bg-gray-200">Books</Link></li>
                        <li><Link to='/explore' className="block px-4 py-2 hover:bg-gray-200">Movies & TV</Link></li>
                    </ul>
                </div>
            </div>
        }
        { (navString === 'service') && 
            <div className="flex">
                <div className="mr-4 px-10">
                    <ul className="list-none">
                        <li><Link to='/services' className="block px-4 py-2 hover:bg-gray-200">Book Study Room</Link></li>
                        <li><Link to='/services' className="block px-4 py-2 hover:bg-gray-200">Book a Computer</Link></li>
                    </ul>
                </div> 
            </div>
        }
    </ul>
    )
}
