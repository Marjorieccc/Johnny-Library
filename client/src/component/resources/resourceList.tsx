import React from "react";
import ResourceCard from "./resourceCard";
import { Resource } from "../../types/resource";

export default function ResourceList({
  resourceList,
}: {
  resourceList: Resource[];
}) {
  return (
    <ul>
      {resourceList.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
    </ul>
  );
}
