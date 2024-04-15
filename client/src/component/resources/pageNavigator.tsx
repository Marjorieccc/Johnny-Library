import React, { useState, useRef} from "react";
import 'primeicons/primeicons.css';

type pageProps ={
    setPageNumber: (pageNumber: number) => void;
    setStartPageNumber:(startPageNumber: number) => void;
    setEndPageNumber:(endPageNumber: number) => void;
    startPageNumber:number;
    endPageNumber:number;
    totalPages:number;
    startIndex: number;
    endIndex: number;
    totalItems:number;
}

export default function PageNavigate({ resources: { setPageNumber, setStartPageNumber,setEndPageNumber,
                                                    startPageNumber,endPageNumber,
                                                    totalPages, startIndex, endIndex, totalItems } }: { resources: pageProps }){
    const selectPage = useRef<number>(1)

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
      const newStart = Math.max(1, startPageNumber + interval);
      const newEnd = Math.min(totalPages, endPageNumber + interval);
      setStartPageNumber(newStart);
      setEndPageNumber(newEnd);
    }
    
    const handleLocalPageClick = (newPageNumber: number) => {
        selectPage.current=newPageNumber;    // Set the selected page locally for UI updates 
        setPageNumber(newPageNumber);        // propagating the selection to ExplorePage
        
    };
    
    return(
        <div className="mx-auto">
            <div className="sm:flex sm:justify-center ">
            {/* Resets the pagination to show the first set of pages. Disabled when already at the first set. */}
            <button onClick={()=>backToStart()} disabled={startPageNumber === 1}>
             <span className="pi pi-step-backward" style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Moves the pagination back by one set of pages. Disabled when on the first set of pages. */}
            <button onClick={() => handleChange(-pageInterval)} disabled={startPageNumber === 1}>
                <span className="pi pi-angle-left" style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Display and allow navigation to specific pages. Highlights the currently selected page. */}
            {displayPageList?.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className="w-8 h-8 text-xs text-gray-700 rounded-full lg:ml-2 lg:py-1" 
                    onClick={() => handleLocalPageClick(pageNumber)}
                    style={{ fontWeight: selectPage.current === pageNumber ? 'bold' : 'normal' }}
                >{pageNumber}
                </button>
            ))}

            {/* Advances the pagination to the next set of pages. Disabled when on the last set of pages. */}
            <button onClick={() => handleChange(pageInterval)} disabled={endPageNumber > totalPages}>
                <span className="pi pi-angle-right" style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Navigates directly to the last set of pages. Disabled when already viewing the last set. */}            
            <button onClick={()=>goToEnd()}  disabled={endPageNumber > totalPages}>
                <span className="pi pi-step-forward" style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></span>

            </button>

            </div>

            <p className="py-2 text-xs sm:text-center lg:ml-24">
                {startIndex} to {endIndex} of {" "} {totalItems} results
            </p>
        </div>
    );






}