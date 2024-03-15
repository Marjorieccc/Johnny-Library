import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import SideBarFilter, { Filter } from "../component/sideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import {
  IResource,
  fetchByFilter,
  fetchResources,
  fetchBySearchTerm,
} from "../api/fetch";

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<Filter>({
    format: [],
    category: [],
    language: [],
  });
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";

  // ----------- Filter Selected Resources -----------
  const { data: resourceList } = useQuery({
    queryKey: ["resourceList", selectFilter],
    queryFn: () => {
      // check if any filter is selected
      const isEmptyFitler = Object.values(selectFilter).every(
        (filter) => filter.length === 0
      );
      if (isEmptyFitler) {
        fetchResources();     // fetch all resources
      } else if (searchTerm.length > 1) {
        fetchByFilter(selectFilter, searchTerm);  // filter matching resources by selected filters
      } else {
        fetchByFilter(selectFilter);  // fetch filtered resources
      }
    },
    staleTime: 0,
  });

  // ----------- Query resources with matching titles -----------
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery<IResource[]>({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => fetchBySearchTerm(searchTerm),
    enabled: !!searchTerm,
  });

  return (
    <>
      <SideBarFilter
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
      />
      {searchLoading && <div>Search Loading...</div>}
      {searchError && <div>Error: {searchError.message}</div>}
      {searchData &&
        searchData.map((resource) => (
          <p key={resource._id} className="text-sm text-gray-900">
            {resource.title}
          </p>
        ))}
      {resourceList && <ResourceList resourceList={resourceList} />}
    </>
  );
}
