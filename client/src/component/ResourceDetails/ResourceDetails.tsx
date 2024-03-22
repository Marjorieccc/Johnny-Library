import React, { useState, useEffect } from "react";

import { ResourceProps, MediumProps } from "../../types/resource";
import Tab from "./Tab";

const ResourceDetails = function ({ resource }: { resource: ResourceProps }) {
  //console.log(resource.medium[0].format)
  const mediumList = resource.medium.map((props) => (props.format));

  return (
    <div className="container mx-auto p-4 text-center sm:text-left">
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="h-full flex flex-col justify-between">
          {/* Top left box */}
          <div className="flex flex-col gap-2">
            <p className="mb-2 text-gray-700 font-bold">
              Available in {mediumList.join(", ")} 
            </p>
            <span className="text-gray-500">{resource.shortDescription}</span>
            <span className="inline-block mb-2 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white rounded-md py-2 px-4">
              Category: {resource.category.join(", ")}
            </span>
          </div>
        </div>
        {/* Top right box */}
        <div className="w-full">
          <img
            src={resource.thumbnail_url}
            alt={resource.title}
            className="w-full h-auto max-w-md mx-auto object-cover rounded-md"
          />
        </div>
      </div>
      <div className="mt-8">
        {/* Tabs */}
        <Tab resource={resource} />
      </div>
    </div>
  );
};

export default ResourceDetails;
