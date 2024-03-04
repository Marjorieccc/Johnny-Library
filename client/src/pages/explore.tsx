import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SideBarFilter, { Filter } from "../component/sideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import { fetchByFilter, fetchResources } from "../api/fetch";

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<Filter>({
    format: [],
    category: [],
    language: [],
  });

  // ----------- Filter Selected Resources -----------
  const { data: resourceList } = useQuery({
    queryKey: ["resourceList", selectFilter],
    queryFn: () => {
      const isEmptyFitler = Object.values(selectFilter).every(
        (filter) => filter.length === 0
      );
      isEmptyFitler ? fetchResources() : fetchByFilter(selectFilter);
    },
    staleTime: 0,
  });

  return (
    <>
      <SideBarFilter
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
      />
      {resourceList && <ResourceList resourceList={resourceList} />}
    </>
  );
}
