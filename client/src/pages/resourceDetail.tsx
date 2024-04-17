import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResourceDetails from "../component/resources/resourceDetails/resourceDetails";
import { Resource } from "../types/resourceType";
import { fetchByID } from "../api/fetchResource/fetchResource";

export default function ResourceDetailPage() {
  const { resource_id } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);
  useEffect(
    function () {
      const fetchResource = async function (resource_id: string) {
        const res = await fetchByID(resource_id);
        //console.log("in page detail: ", res);
        setResource(res);
      };
      resource_id && fetchResource(resource_id);
    },
    [resource_id],
  );

  return (
    <>
      <>{resource ? <ResourceDetails resource={resource} /> : <p>Loading</p>}</>
    </>
  );
}
