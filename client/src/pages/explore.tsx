import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { FilterList, SearchResult } from "../types/resourceType";
import ResourceList from "../component/resources/resourceList";
import { fetchResources } from "../api/fetchResource/fetchResource";
import ResourcePage from "../component/resources/resourcePage";
import Modal from "../component/modal/modal";
import ResourceFilter from "../component/resources/resourceFilter";

export default function ExplorePage() {
  // filter options
  const [selectFilter, setSelectFilter] = useState<FilterList>({
    format: [],
    category: [],
    language: [],
  });

  // User current selection of page number
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  // User previous selection of page number
  const [previousPageNumber, setPreviousPageNumber] = useState<number>(1);

  // search queries
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";

  const numberPerPage = 9; // To display 3 * 3 grid return

  // Update page number to retrieve data
  function setPageNumber(newPageNumber: number) {
    setCurrentPageNumber(newPageNumber);
    console.log("get from child: " + newPageNumber);
  }

  // manage user selected page
  useEffect(() => {
    setPreviousPageNumber(currentPageNumber);
  }, [currentPageNumber]);

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
    <div className="flex h-full gap-4 overflow-x-auto p-4">
      {/* SideBar */}
      <div className="hidden w-full text-base leading-normal text-gray-800 lg:block lg:px-5 lg:pt-6">
        <div
          id="menu-content"
          className="inset-0 hidden w-60 shrink-0 
            overflow-y-auto overflow-x-hidden shadow lg:block lg:h-auto 
            lg:overflow-y-hidden lg:border-transparent lg:bg-transparent lg:shadow-none"
        >
          <h1 className="font-fjalla text-3xl font-bold">Filters</h1>
          <div className="inset-x-0 mb-5 h-2 bg-red-800"></div>
          <ResourceFilter
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
          />
        </div>
      </div>

      <div className="w-3/5 min-w-max">
        {/* Filters Modal */}
        <div className="m-6">
          <Modal
            buttonContent={<span>Filters</span>}
            header={<p className="text-3xl font-bold">Filters</p>}
            modalContent={
              <div className="my-10 h-full overflow-y-auto overflow-x-hidden">
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

        <div className="items-start px-16 ">
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
          <div>
            <ResourcePage
              resources={{
                setPageNumber: setPageNumber,
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
