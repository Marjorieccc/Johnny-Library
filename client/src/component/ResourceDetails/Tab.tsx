import React, { useState, useEffect } from "react";
import { ResourceProps, MediumProps } from "../../types/resource";

import { makeReservationAPI } from "../../api/fetchResource/fetchResource";

const reserveBtnStyle =
  "disabled:opacity-50 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800";

const TabContent = function ({
  resourceID,
  description = "No description",
  mediumDetails,
}: {
  resourceID: string;
  description: string;
  mediumDetails: MediumProps;
}) {
  const [availability, setAvailability] = useState(
    mediumDetails.status ? true : false
  );

  const handleReservation = async function () {
    try {
      const response = await makeReservationAPI(
        "00000",
        resourceID,
        mediumDetails._id
      );
      if (response) {
        setAvailability(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <p className="text-gray-500 mb-2">{description}</p>
        <p className="text-gray-500">Publisher: {mediumDetails.publisher}</p>
        <p className="text-gray-500">
          Language: {mediumDetails.language.join(", ")}
        </p>
        <p className="text-gray-500">
          Year: {String(mediumDetails.year_of_publication)}
        </p>
      </div>
      <br></br>
      <button
        disabled={!availability}
        onClick={handleReservation}
        className={reserveBtnStyle}
      >
        {availability ? `Reserve ${mediumDetails.format}` : "Not Available"}
      </button>
    </>
  );
};

const tabStyle = `text-gray-500 py-2 px-4 rounded-t-md font-bold border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300`;

const Tab = function ({ resource }: { resource: ResourceProps }) {
  const [mediumList, setMediumList] = useState<string[]>([]);

  useEffect(() => {
    const updatedMediumList = resource.medium.map(
      (mediumDetails) => mediumDetails.format
    );
    setMediumList(updatedMediumList);
  }, [resource]);

  const [selectedTab, setSelectedTab] = useState(
    resource.medium.length > 0 ? resource.medium[0].format : ""
  );

  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
  };

  const emptyMedium = {} as MediumProps;

  return (
    <>
      <nav className="flex mb-4">
        {resource.medium.map((mediumDetails) => {
          return (
            <button
              key={mediumDetails._id}
              type="button"
              className={`${tabStyle} ${
                selectedTab === mediumDetails.format
                  ? "text-blue-500 border-blue-500 bg-gray-200"
                  : "text-gray-500 border-gray-300 bg-gray-100 hover:bg-gray-200"
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
        description={
          resource.longDescription ? resource.longDescription : "no description"
        }
        mediumDetails={
          resource.medium.find(
            (props: MediumProps) => props.format === selectedTab
          ) || emptyMedium
        }
      />
    </>
  );
};

export default Tab;
