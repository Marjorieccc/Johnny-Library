import React from "react";
import { Resource } from "../../api/fetchResource/fetchResource";
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
          <li key={resource.resource_id}>
            <ResourceCard {...resource} />
          </li>
        ))}
      </ul>
    </div>
  );
}