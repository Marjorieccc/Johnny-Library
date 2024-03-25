import React from "react";
import ResourceCard from "./resourceCard";
import { Resource } from "../../types/resource";

export default function ResourceList({resourceList}: {resourceList: Resource[]}) {
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-px gap-y-6 lg:pr-80">
      {resourceList.map((resource) => (
        <ResourceCard key={resource._id} resource={resource}/>
      ))}
    </div>

  );
}