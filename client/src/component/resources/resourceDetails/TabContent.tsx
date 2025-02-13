import  { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Medium } from "../../../types/resourceType";
import { makeReservationAPI } from "../../../api/fetchResource/fetchResource";
import Auth0LoginRedirectBtn from "../../auth0/Auth0LoginRedirectBtn";
import { useAccountDetails } from "../../../context/AccountDetailsProvider";

const reserveBtnStyle =
  "disabled:opacity-50 border border-red-800 rounded-md text-red-800 text-base font-bold py-2 px-4  hover:bg-[#E32B31] hover:text-white focus:outline-none  active:bg-white";


export default function TabContent({
  resourceID,
  resourceTitle,
  mediumDetails,
}: {
  resourceID: string;
  resourceTitle: string;
  mediumDetails: Medium;
}) {
  const [reserved, setReserved] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { reservations } = useAccountDetails();

  // Check if the current resource is reserved by the user upon component mount, updating the 'reserved' state accordingly.
  useEffect(() => {
    const foundResource = reservations.find(
      (resource) => resource.resourceID === resourceID,
    );
    if (foundResource) {
      setReserved(true);
    } else {
      setReserved(false);
    }
  }, []);

  // Attempts to reserve the current resource for the authenticated user.
  const handleReservation = async function () {
    if (isAuthenticated && user) {

      // Retrieves an access token silently, then makes an API call to reserve the resource.
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
          setReserved(true); // Updates the 'reserved' state to true if the reservation is successful.
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      new Error("Login fail, Please try again");
    }
  };

  return (
    <>
      {/* information of selected medium */}
      <div className="text-nowrap">
        <div className="lg:mb-4 lg:flex-col lg:mr-10">
          <p className="my-6 text-gray-900 lg:text-sm lg:my-0">Publisher:  
              <span className="pl-2 text-gray-500 ">{mediumDetails.publisher}</span>
          </p>
          <p className="my-6 text-gray-900 lg:text-sm lg:my-1">Language:  
              <span className="pl-2 text-gray-500 ">{mediumDetails.language.join(", ")}</span>
          </p>
          <p className="my-6 lg:text-sm text-gray-900 lg:my-0.5">Year:  
              <span className="pl-2 text-gray-500 ">{String(mediumDetails.year_of_publication)}</span>
          </p>
        </div>
      </div>
      
      {/* Display the "Reserve" button if the user is authenticated and the resource is not yet reserved. */}
      {isAuthenticated && !reserved && (
        <div className="flex justify-center lg:justify-start lg:mt-4 ">
        <button onClick={handleReservation} className={reserveBtnStyle}>
          Reserve {mediumDetails.format}
        </button>
        </div>
      )}

      {isAuthenticated && reserved && <p className="py-2 text-xl font-bold text-red-800 ">Reserved!</p>}

      {/*If the user is not authenticated, display the login button for redirection to the Auth0 login.*/}
      {!isAuthenticated && <Auth0LoginRedirectBtn />}
    </>
  );
}
