import ResourceCard from "./ResourceCard";
import { Resource } from "../../types/resourceType";

export default function ResourceList({resourceList}: {resourceList: Resource[]}) {
  return (

    <div className="grid grid-cols-1 mb-8 overflow-hidden lg:w-11/12 md:w-full sm:w-full auto-cols-auto md:grid-cols-2 gap-x-1 lg:grid-cols-3 gap-y-14 justify-items-center">
      {resourceList.map((resource) => (
        <ResourceCard key={resource._id} resource={resource}/>
      ))}
    </div>

  );
}