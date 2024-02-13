import React, { useState } from "react";

import SideBarFilter from "../component/SideBar/sideBarFilter";
import ResourceList from "../component/resources/resourceList";
import { Resource } from "../component/SideBar/filterBy/filterBy";

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
