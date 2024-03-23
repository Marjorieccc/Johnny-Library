import React from "react";
import { Link } from "react-router-dom";
import { Resource } from "../../api/fetchResource/fetchResource";

export default function ResourceCard(resource: Resource) {
  return (
    <Link to={`/resource/${resource.resource_id}`}>
    <div>
      <h2>{resource.title}</h2>
      <p>{resource.author}</p>
    </div>
  </Link>
  )
}