import React from "react";
import { Resource } from "../SideBar/FilterBy/filterBy";
import ResourceCard from "./resourceCard";

type ResourceList = {
  resourceList: Resource[]
}

export default function ResourceList({resourceList}: ResourceList) {
  return (
    <div>
      <header>Browse Our Selection</header>
      <ul>
        {resourceList.map((resource) => (
          <li key={resource.key}>
            <ResourceCard {...resource} />
          </li>
        ))}
      </ul>
    </div>
  );
}