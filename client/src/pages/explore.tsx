import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { SearchResult } from "../types/resource";
import SideBarFilter, { Filter } from "../component/sideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import { fetchResources } from "../api/fetchResource/fetchResource";

export default function ExplorePage() {
  // filter options
  const [selectFilter, setSelectFilter] = useState<Filter>({
    format: [],
    category: [],
    language: [],
  });
  // paginations
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [previousPageNumber, setPreviousPageNumber] = useState<number>(1);
  // search queries
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";

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

  const totalPages = Math.ceil((filterData?.totalItems ?? 0) / 10);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4">
      <div className="w-1/5 min-w-max">
        <SideBarFilter
          selectFilter={selectFilter}
          setSelectFilter={setSelectFilter}
        />
      </div>
      <div className="w-4/5 min-w-max">
        {isLoading && (
          <div className="mt-40 items-center justify-center px-10 py-10">
            Search Loading...
          </div>
        )}
        {error && (
          <div className="mt-40 items-center justify-center px-10 py-10">
            Error: {error.message}
          </div>
        )}

        <div className="mt-40 items-center justify-center px-10 py-10">
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
        {filterData?.data &&
          filterData.data.length > 0 &&
          pageNumbers.map((num) => (
            <button
              key={num}
              className="px-2 py-1 text-green-500"
              onClick={() => setCurrentPageNumber(num)}
            >
              {num}
            </button>
          ))}

        {/* Display the current range of displayed results and the total number of matching results. */}
        {filterData?.data && filterData.data.length > 1 && (
          <p className="px-2 py-1">
            Showing {filterData.startIndex} to {filterData.endIndex} of total{" "}
            {filterData.totalItems} results
          </p>
        )}
      </div>
    </div>
  );
}
