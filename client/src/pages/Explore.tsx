import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { FilterList, SearchResult } from "../types/resourceType";
import { fetchResources } from "../api/fetchResource/fetchResource";
import ResourceList from "../component/resources/ResourceList";
import ResourceFilter from "../component/resources/ResourceFilter";
import PageNavigate from "../component/resources/PageNavigator";
import Modal from "../component/modal/Modal";

export default function ExplorePage() {
  // filter options
  const [selectFilter, setSelectFilter] = useState<FilterList>({
    format: [],
    category: [],
    language: [],
  });

  // ----------- Page navigation setup ------------
  const pageInterval = 5; // Number of pages displayed in page navigator
  const numberPerPage = 9; // Number of items to display per page.

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);   // User current selection of page number
  const [previousPageNumber, setPreviousPageNumber] = useState<number>(1); // User previous selection of page number
  
  // State for tracking the starting page number displayed in page navigator
  const [startPageNumber, setStartPageNumber] = useState<number>(1);
  const [endPageNumber, setEndPageNumber] = useState<number>(pageInterval);

  // Update page number to retrieve data
  function setPageNumber(newPageNumber: number) {
    setCurrentPageNumber(newPageNumber);
  }

  // manage user selected page
  useEffect(() => {
    setPreviousPageNumber(currentPageNumber);
  }, [currentPageNumber]);

  // ----------- Page navigation setup ------------
  

  // search queries retrieve from SearchBar component
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";


  // ----------- Filter Selected Resources -----------
  const {
    data: filterData,
    isLoading,
    error,
  } = useQuery<SearchResult>({
    queryKey: ["filterData", selectFilter, searchTerm, currentPageNumber],
    queryFn: () => {
      // check if any filter is selected
      const isEmptyFitler = Object.values(selectFilter).every(
        (filter) => filter.length === 0,
      );
      // check if user select specific page number
      const pageNum: number =
        currentPageNumber !== previousPageNumber ? currentPageNumber : 1;

      if (isEmptyFitler && !searchTerm) {
        return fetchResources(pageNum); // fetch all resources
      } else if (searchTerm.length > 1) {
        return fetchResources(pageNum, selectFilter, searchTerm); // fetch resources matched title
      } else {
        return fetchResources(pageNum, selectFilter); // fetch filtered resources
      }
    },
    staleTime: 0,
  });

  // Determines the total pages by rounding up the division of total query results by items per page
  const totalPages = Math.ceil((filterData?.totalItems ?? 0) / numberPerPage);

  return (
    <div className="flex justify-center h-full gap-4 p-4 mx-auto overflow-x-auto">
      {/* SideBar */}
      <div className="text-base leading-normal text-gray-800 border-hidden lg:ml-auto lg:block lg:px-5 lg:pt-6">
        <div
          id="menu-content"
          className="inset-0 hidden overflow-x-hidden overflow-y-auto shadow w-60 shrink-0 lg:block lg:h-auto lg:overflow-y-hidden lg:border-transparent lg:bg-transparent lg:shadow-none"
        >
          <h1 className="text-3xl font-bold font-fjalla">Filters</h1>
          <div className="inset-x-0 h-2 mb-5 bg-red-800"></div>
          <ResourceFilter
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
          />
        </div>
      </div>

      <div className="w-4/5 lg:w-4/6 lg:border-purple-100"> 
        {/* Filters Modal */}
        <div className="m-6">
          <Modal
            buttonContent={<span>Filters</span>}
            header={<p className="text-3xl font-bold">Filters</p>}
            modalContent={
              <div className="h-full my-10 overflow-x-hidden overflow-y-auto">
                <ResourceFilter
                  selectFilter={selectFilter}
                  setSelectFilter={setSelectFilter}
                />
              </div>
            }
          />
        </div>
        {isLoading && (
          <div className="items-center justify-center px-10 ">
            Search Loading...
          </div>
        )}
        {error && (
          <div className="items-center justify-center px-10 ">
            Error: {error.message}
          </div>
        )}

        <div className="items-start "> 
          {/* If there is no matching result */}
          {filterData?.data && filterData.data.length < 1 && (
            <p>No matching result!</p>
          )}

          {/* Render ResourceList component only if there's at least one matching result. */}
          {filterData?.data && filterData.data.length > 0 && (
            <ResourceList resourceList={filterData.data} />
          )}
        </div>

        {/* Show page list only if there is at least 1 page (10 items) matching result. */}
        {filterData?.data && filterData.data.length > 0 && (
          <div className="flex justify-center">
           <PageNavigate resources={{
                setPageNumber: setPageNumber,
                setStartPageNumber: setStartPageNumber,
                setEndPageNumber: setEndPageNumber,
                startPageNumber:startPageNumber,
                endPageNumber:endPageNumber,
                totalPages: totalPages,
                startIndex: filterData.startIndex,
                endIndex: filterData.endIndex,
                totalItems: filterData.totalItems,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
