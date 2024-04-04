import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Medium } from "../../../types/resource";
import { makeReservationAPI } from "../../../api/fetchResource/fetchResource";
import Auth0LoginRedirectBtn from "../../auth0/Auth0LoginRedirectBtn";
import { useAccountDetails } from "../../../context/AccountDetailsProvider";

const reserveBtnStyle =
  "disabled:opacity-50 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800";


export default function TabContent({
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

  useEffect(function () {
    const foundResource = reservations.find(
      (resource) => resource.resourceID === resourceID,
    );
    if (foundResource) {
      setReserved(true);
    } else {
      setReserved(false);
    }
  }, []);

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
}
