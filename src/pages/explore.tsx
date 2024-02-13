import React, { useState } from "react";

import SideBarFilter from "../component/sideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import { Resource } from "../api/fetch";

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<string[]>([]);
  const resource: Resource[] = [];



  // ----------- Filter Selected Resources -----------
  // function filteredResources() {
    
  // }

  return (
    <>
      <SideBarFilter selectFilter={selectFilter} setSelectFilter={setSelectFilter} />
      <ResourceList resourceList={resource} />
    </>
  );
}
