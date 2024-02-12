import React, { useState } from "react";

import SideBar from "../component/SideBar/sideBar";
import ResourceList from "../component/resources/resourceList";
import { Resource } from "../component/SideBar/filterBy/filterBy";

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<string[]>([]);
  const resource: Resource[] = [];

  // ----------- Filter By -----------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const indexOfCategory = selectFilter.indexOf(value);

    if (indexOfCategory !== -1) {
      // If the category is already in the filter list, remove it
      setSelectFilter((prevFilter) =>
        prevFilter.filter((item) => item !== value)
      );
    } else {
      // If the category is not in the filter list, add it
      setSelectFilter((prevFilter) => [...prevFilter, value]);
    }
  };

  // ----------- Filter Selected Resources -----------
  // function filteredResources() {
    
  // }

  return (
    <>
      <SideBar handleChange={handleChange} />
      <ResourceList resourceList={resource} />
    </>
  );
}
