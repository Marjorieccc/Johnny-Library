import React from "react";
import { Link } from "react-router-dom";
import { Resource } from "../../types/resource";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link to={`/resource/${resource._id}`} key={resource._id}>
      <div className="flex items-start space-x-4">
        <img
          src={resource.thumbnail_url}
          alt={resource.title}
          className="h-20 w-20 object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{resource.title}</h3>

          {resource.medium.map((mediumItem, index) => (
            <p key={index} className=" mb-1 py-1 text-xs">
              {mediumItem.format}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}
