import React, { useState} from "react";
import TabContent from "./tabContent";
import { Resource, Medium } from "../../../types/resourceType";

const tabStyle = `py-2 px-4  hover:text-gray-700 `;

export default function Tab({ resource }: { resource: Resource }) {
  const [selectedTab, setSelectedTab] = useState(
    resource.medium.length > 0 ? resource.medium[0].format : "",
  );

  function handleTabChange(newTab: string) {
    setSelectedTab(newTab);
  }

  return (
    <div className="w-fit">
      <nav className="flex justify-center mb-4 lg:justify-start">
        {resource.medium.map((mediumDetails) => {
          return (
            <button
              key={mediumDetails._id}
              type="button"
              className={`${tabStyle} ${
                selectedTab === mediumDetails.format
                  ? "border-x-2 border-t-2 border-b-0 border border-[#E32B31] font-bold"
                  : "border-[#E32B31] border-b-2 text-gray-700"
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
        mediumDetails={
          resource.medium.find(
            (medium: Medium) => medium.format === selectedTab,
          ) || ({} as Medium)
        }
      />
    </div>
  );
}
