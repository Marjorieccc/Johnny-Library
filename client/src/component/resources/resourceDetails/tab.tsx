import React, { useState } from "react";

import TabContent from "./tabContent";
import { Resource, Medium } from "../../../types/resource";

const tabStyle = `text-gray-500 py-2 px-4 rounded-t-md font-bold border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300`;

export default function Tab({ resource }: { resource: Resource }) {
  const [selectedTab, setSelectedTab] = useState(
    resource.medium.length > 0 ? resource.medium[0].format : "",
  );

  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
  };

  return (
    <>
      <nav className="mb-4 flex">
        {resource.medium.map((mediumDetails) => {
          return (
            <button
              key={mediumDetails._id}
              type="button"
              className={`${tabStyle} ${
                selectedTab === mediumDetails.format
                  ? "border-blue-500 bg-gray-200 text-blue-500"
                  : "border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange(mediumDetails.format)}
            >
              {mediumDetails.format}
            </button>
          );
        })}
      </nav>
      <TabContent
        key={selectedTab}
        resourceID={resource._id}
        resourceTitle={resource.title}
        description={
          resource.longDescription ? resource.longDescription : "no description"
        }
        mediumDetails={
          resource.medium.find(
            (medium: Medium) => medium.format === selectedTab,
          ) || ({} as Medium)
        }
      />
    </>
  );
}
