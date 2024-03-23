import React from "react";
import { Resource } from "../../types/resource";

export default function ResourceCard({resource}: {resource: Resource}) {
  return (
    <div className="flex items-start space-x-4">
      <img src={resource.thumbnail_url} alt={resource.title} className="w-20 h-20 object-cover" />
      <div>
        <h3 className="text-lg font-semibold">{resource.title}</h3>

          {resource.medium.map((mediumItem, index) => (
            <p key={index} className=" text-xs py-1 mb-1">{mediumItem.format}</p>
          ))}
      </div>
    </div>
  )
}
