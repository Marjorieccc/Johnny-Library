import { useState } from "react";
import TabContent from "./TabContent";
import { Resource, Medium } from "../../../types/resourceType";

const tabStyle = `py-2 px-4 hover:text-gray-700 focus:outline-none focus:ring rounded`;

export default function Tab({ resource }: { resource: Resource }) {
  const [selectedTab, setSelectedTab] = useState(
    resource.medium.length > 0 ? resource.medium[0].format : ""
  );

  function handleTabChange(newTab: string) {
    setSelectedTab(newTab);
  }

  // Keyboard navigation between tabs with arrow keys
  function handleKeyDown(e: React.KeyboardEvent, format: string) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const formats = resource.medium.map((medium) => medium.format);
      const currentIndex = formats.indexOf(selectedTab);
      let newIndex;

      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % formats.length;
      } else {
        newIndex = (currentIndex - 1 + formats.length) % formats.length;
      }

      setSelectedTab(formats[newIndex]);
    }
  }

  return (
    <div className="w-fit">
      {/* Format tabs */}
      <div
        role="tablist"
        aria-label="Resource formats"
        className="flex justify-center mb-4 lg:justify-start"
      >
        {resource.medium.map((mediumDetails) => {
          const isSelected = selectedTab === mediumDetails.format;
          return (
            <button
              key={mediumDetails._id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${mediumDetails.format.replace(/\s+/g, "-").toLowerCase()}`}
              id={`tab-${mediumDetails.format.replace(/\s+/g, "-").toLowerCase()}`}
              className={`${tabStyle} ${
                isSelected
                  ? "border-x-2 border-t-2 border-b-0 border border-primary-red font-bold"
                  : "border-b-2 border-primary-red text-gray-700"
              }`}
              onClick={() => handleTabChange(mediumDetails.format)}
              onKeyDown={(e) => handleKeyDown(e, mediumDetails.format)}
              tabIndex={isSelected ? 0 : -1}
            >
              {mediumDetails.format}
            </button>
          );
        })}
      </div>
      {/* Resource' Content */}
      <TabContent
        key={selectedTab}
        resourceID={resource._id}
        resourceTitle={resource.title}
        tabId={`tabpanel-${selectedTab.replace(/\s+/g, "-").toLowerCase()}`}
        tabLabelledBy={`tab-${selectedTab.replace(/\s+/g, "-").toLowerCase()}`}
        mediumDetails={
          resource.medium.find(
            (medium: Medium) => medium.format === selectedTab
          ) || ({} as Medium)
        }
      />
    </div>
  );
}
