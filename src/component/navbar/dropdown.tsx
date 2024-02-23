import React from "react";

type DropdownProps ={
    navString: string;
  }

export default function Dropdown({navString}: DropdownProps){
    return(
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-gray-100 w-full absolute left-0 right-0 top-full mt-1 font-roboto-condensed w-screen ">         
        { (navString == "explore") && 
            <div className="flex">
                <div className="mr-4">
                    <ul className="list-none">
                        <li className="font-extrabold block px-4 py-2">BY CATEGORY</li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Fiction</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Non-Fiction</a></li>
                    </ul>
                 </div>
                 <div className="mr-4">
                    <ul className="list-none">
                        <li className="font-extrabold block px-4 py-2">BY FORMAT</li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Books</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Movies & TV</a></li>
                    </ul>
                </div>
            </div>
        }
        { (navString == "service") && 
            <div className="flex">
                <div className="mr-4">
                    <ul className="list-none">
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Book Study Room</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Book a Computer</a></li>
                    </ul>
                </div> 
            </div>
        }
    </ul>
    )
}
