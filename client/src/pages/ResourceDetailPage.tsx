import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResourceDetails from "../component/ResourceDetails/ResourceDetails";
import { ResourceProps } from "../types/resource";
import { fetchByID } from "../api/fetchResource/fetchResource";

function ResourceDetailPage() {
  const { resource_id } = useParams();
  const [resource, setResource] = useState({} as ResourceProps);
  useEffect(function () {
    const fetchResource = async function (resource_id: string) {
      const res = await fetchByID(resource_id);
      setResource(res);
    };
  }, []);

  return <ResourceDetails resource={resource} />;
}

export default ResourceDetailPage;
