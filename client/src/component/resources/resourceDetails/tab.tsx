import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Resource, Medium } from "../../../types/resource";
import { makeReservationAPI } from "../../../api/fetchResource/fetchResource";
import Auth0LoginRedirectBtn from "../../auth0/Auth0LoginRedirectBtn";
import { useAccountDetails } from "../../../context/AccountDetailsProvider";

const reserveBtnStyle =
  "disabled:opacity-50 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800";

const TabContent = function ({
  resourceID,
  resourceTitle,
  description = "No description",
  mediumDetails,
}: {
  resourceID: string;
  resourceTitle: string;
  description: string;
  mediumDetails: Medium;
}) {
  const [reserved, setReserved] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { reservations } = useAccountDetails();

  useEffect(
    function () {
      const foundResource = reservations.find(
        (resource) => resource.resourceID === resourceID,
      );
      if (foundResource) {
        setReserved(true);
      } else {
        setReserved(false);
      }
    },
    [],
  );

  const handleReservation = async function () {
    if (isAuthenticated && user) {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await makeReservationAPI(
          // user.sub = id from auth0
          user.sub ? user.sub : "test",
          resourceID,
          resourceTitle,
          mediumDetails._id,
          mediumDetails.format,
          accessToken,
        );
        if (response) {
          setReserved(true);
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      new Error("Not Log in");
    }
  };

  return (
    <>
      <div>
        <p className="mb-2 text-gray-500">{description}</p>
        <p className="text-gray-500">Publisher: {mediumDetails.publisher}</p>
        <p className="text-gray-500">
          Language: {mediumDetails.language.join(", ")}
        </p>
        <p className="text-gray-500">
          Year: {String(mediumDetails.year_of_publication)}
        </p>
      </div>
      <br></br>
      {isAuthenticated && !reserved && (
        <button onClick={handleReservation} className={reserveBtnStyle}>
          Reserve {mediumDetails.format}
        </button>
      )}
      {isAuthenticated && reserved && <p>Reserved</p>}
      {!isAuthenticated && <Auth0LoginRedirectBtn />}
    </>
  );
};

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
