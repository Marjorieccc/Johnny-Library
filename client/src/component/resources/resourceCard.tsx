import React from "react";
import { Link } from "react-router-dom";
import { Resource } from "../../api/fetchResource/fetchResource";

export default function ResourceCard({resource}: {resource: Resource}) {
  return (
    <div className="flex items-start space-x-4">
      <img src={resource.thumbnail_url} alt={resource.title} className="w-20 h-20 object-cover" />
      <div>
        <h3 className="text-lg font-semibold">{resource.title}</h3>

          {resource.medium.map((mediumItem, index) => (
            <Link to={`/resource/${resource.resource_id}`} key={index}>
            <div>
              <p className ="text-xs py-1 mb-1">{resource.title}</p>
            </div>
          </Link>
          ))}
      </div>
    </div>
  )
}
