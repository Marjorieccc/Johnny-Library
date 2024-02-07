import React from "react";

import SideBar from "../component/SideBar/sideBar";
import ResourceList from "../component/Resources/resourceList";
import { Resource } from "../component/SideBar/FilterBy/filterBy";

export default function ExplorePage() {
  const resource: Resource[] =[];

  // ----------- Radio Filtering -----------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const setSelectedCategory = "123";
  };

  return (
    <>
      <SideBar handleChange={handleChange}/>
      <ResourceList resourceList={resource}/>
    </>
  );
}
