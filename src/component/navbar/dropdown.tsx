import React from "react";

type DropdownProps ={
    navString: string;
  }

export default function Dropdown({navString}: DropdownProps){
    return(
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-lg w-full absolute left-0 right-0">         
            { (navString == "explore") && 
                <div className="flex">
                    <div className="mr-4">
                        <h3 className="font-bold mb-2">BY CATEGORY</h3>
                        <ul className="list-none">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Fiction</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Non-Fiction</a></li>
                        </ul>
                     </div>
                     <div className="mr-4">
                        <h3 className="font-bold mb-2">BY FORMAT</h3>
                        <ul className="list-none">
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
