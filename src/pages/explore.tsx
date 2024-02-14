import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SideBarFilter from "../component/sideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import { Resource, fetchByFilter } from "../api/fetch";

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<string[][]>([[],[],[]]);

  // ----------- Filter Selected Resources -----------
  const {data: resourceList} = useQuery({
    queryKey:["resourceList"],
    queryFn:()=> fetchByFilter()
  })
  // function filteredResources() {
    
  // }

  return (
    <>
      <SideBarFilter selectFilter={selectFilter} setSelectFilter={setSelectFilter}/>
      {resourceList && <ResourceList resourceList={resourceList}/>}
    </>
  );
}
