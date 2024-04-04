import React, { useState } from "react";
import 'primeicons/primeicons.css';

type resourcePageProps ={
    setPageNumber: (pageNumber: number) => void;
    totalPages:number;
    startIndex: number;
    endIndex: number;
    totalItems:number;
}

export default function ResourcePage({ resources: { setPageNumber, totalPages, startIndex, endIndex, totalItems } }: { resources: resourcePageProps }){
    const [startPageNumber, setStartPageNumber] = useState<number>(1);
    const [endPageNumber, setEndPageNumber] = useState<number>(5);
    const [selectPageNumber, setSelectPageNumber] = useState<number>(1);

    const pageInterval = 5;
    const allPagesList = Array.from({ length: totalPages }, (_, i) => i + 1);       // number array from 1 to totalPages
    const displayPageList = allPagesList.slice(startPageNumber - 1, endPageNumber); // the sliced list of page number to display

   // Resets the pagination to show the first set of pages, from 1 to pageInterval.
    function backToStart(){
      setStartPageNumber(1);
      setEndPageNumber(pageInterval);
    }

    // Adjusts pagination to display the last set of pages, ending with the total number of pages.
    function goToEnd(){
      const newEnd = Math.ceil(totalPages/pageInterval) * pageInterval;
      setEndPageNumber(newEnd);
      setStartPageNumber(newEnd - pageInterval);
    }

    // Navigates the pagination forward or backward by a pageInterval, updating the range of displayed pages.
    function handleChange(interval:number){
      if ((endPageNumber + interval >= pageInterval) && ((startPageNumber + interval) <totalPages)){
        setEndPageNumber(endPageNumber + interval);
        setStartPageNumber(startPageNumber + interval);
      }
    }
    
    const handleLocalPageClick = (newPageNumber: number) => {
        setSelectPageNumber(newPageNumber)   // Set the selected page locally for UI updates 
        setPageNumber(newPageNumber);        // propagating the selection to ExplorePage
    };
    
    return(
        <div className="ml-4 lg:ml-40 px-20">
            {/* Resets the pagination to show the first set of pages. Disabled when already at the first set. */}
            <button onClick={()=>backToStart()} disabled={startPageNumber === 1}>
                <i className="pi pi-step-backward " style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></i>
            </button>

            {/* Moves the pagination back by one set of pages. Disabled when on the first set of pages. */}
            <button onClick={() => handleChange(-pageInterval)} disabled={startPageNumber === 1}>
                <i className="pi pi-chevron-left ml-4 mr-4 " style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></i>
            </button>

            {/* Display and allow navigation to specific pages. Highlights the currently selected page. */}
            {displayPageList?.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className="ml-2 mr-2 px-1 py-1 w-8 h-8 border rounded-full border-gray-300  text-gray-700 text-xs" 
                    style={{ backgroundColor: selectPageNumber === pageNumber ? '#A8A8A8' : 'white' }}
                    onClick={() => handleLocalPageClick(pageNumber)}
                >{pageNumber}
                </button>
            ))}

            {/* Advances the pagination to the next set of pages. Disabled when on the last set of pages. */}
            <button onClick={() => handleChange(pageInterval)} disabled={endPageNumber > totalPages}>
                <i className="pi pi-chevron-right ml-4 mr-4" style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></i>
            </button>

            {/* Navigates directly to the last set of pages. Disabled when already viewing the last set. */}            
            <button onClick={()=>goToEnd()}  disabled={endPageNumber > totalPages}>
                <i className="pi pi-step-forward " style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></i>
            </button>

            <p className="py-2 text-xs lg:ml-24 ml-4">
                {startIndex} to {endIndex} of {" "} {totalItems} results
            </p>
        </div>
    );






}