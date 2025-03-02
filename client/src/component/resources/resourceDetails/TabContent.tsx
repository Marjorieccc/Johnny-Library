import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Medium } from "../../../types/resourceType";
import { makeReservationAPI } from "../../../api/fetchResource/fetchResource";
import Auth0LoginRedirectBtn from "../../auth0/Auth0LoginRedirectBtn";
import { useAccountDetails } from "../../../context/AccountDetailsProvider";

const reserveBtnStyle =
  "disabled:opacity-50 border border-primary-red rounded-md text-primary-red text-base font-bold py-2 px-4 hover:bg-primary-red hover:text-white focus:outline-none focus:ring focus:ring-focus-blue-500 active:bg-white";

type TabContentProps = {
  resourceID: string;
  resourceTitle: string;
  mediumDetails: Medium;
  tabId: string;
  tabLabelledBy: string;
};

export default function TabContent({
  resourceID,
  resourceTitle,
  mediumDetails,
  tabId,
  tabLabelledBy,
}: TabContentProps) {
  const [reserved, setReserved] = useState(false);
  const [reservationStatus, setReservationStatus] = useState<string>("");
  const [isReserving, setIsReserving] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { reservations } = useAccountDetails();

  // Check if the current resource is reserved by the user upon component mount, updating the 'reserved' state accordingly.
  useEffect(() => {
    const foundResource = reservations.find(
      (resource) => resource.resourceID === resourceID
    );
    if (foundResource) {
      setReserved(true);
    } else {
      setReserved(false);
    }
  }, [reservations, resourceID]);

  // Attempts to reserve the current resource for the authenticated user.
  const handleReservation = async function () {
    if (isAuthenticated && user) {
      setIsReserving(true);
      setReservationStatus("Reserving...");

      try {
        // Retrieves an access token silently, then makes an API call to reserve the resource.
        const accessToken = await getAccessTokenSilently();
        const response = await makeReservationAPI(
          // user.sub = id from auth0
          user.sub ? user.sub : "test",
          resourceID,
          resourceTitle,
          mediumDetails._id,
          mediumDetails.format,
          accessToken
        );
        if (response) {
          setReserved(true); // Updates the 'reserved' state to true if the reservation is successful.
          setReservationStatus("Successfully reserved!");
        }
      } catch (err) {
        console.log(err);
        setReservationStatus("Error making reservation. Please try again.");
      } finally {
        setIsReserving(false);
      }
    } else {
      setReservationStatus("Login failed. Please try again.");
    }
  };

  return (
    <div
      role="tabpanel"
      id={tabId}
      aria-labelledby={tabLabelledBy}
      tabIndex={0}
    >
      {/* information of selected medium */}
      <div className="text-nowrap">
        <div className="lg:mb-4 lg:flex-col lg:mr-10">
          <p className="my-6 text-gray-900 lg:text-sm lg:my-0">
            <span className="font-semibold">Publisher:</span>
            <span className="pl-2 text-gray-700">
              {mediumDetails.publisher}
            </span>
          </p>
          <p className="my-6 text-gray-900 lg:text-sm lg:my-1">
            <span className="font-semibold">Language:</span>
            <span className="pl-2 text-gray-700">
              {mediumDetails.language?.join(", ")}
            </span>
          </p>
          <p className="my-6 lg:text-sm text-gray-900 lg:my-0.5">
            <span className="font-semibold">Year:</span>
            <span className="pl-2 text-gray-700">
              {String(mediumDetails.year_of_publication)}
            </span>
          </p>
        </div>
      </div>

      {/* Status announcements for screen readers */}
      {reservationStatus && (
        <div
          aria-live="polite"
          className={`py-2 text-base ${reservationStatus.includes("Error") ? "text-red-700" : "text-gray-900"}`}
        >
          {reservationStatus}
        </div>
      )}

      {/* Display the "Reserve" button if the user is authenticated and the resource is not yet reserved. */}
      {isAuthenticated && !reserved && (
        <div className="flex justify-center lg:justify-start lg:mt-4">
          <button
            onClick={handleReservation}
            className={reserveBtnStyle}
            disabled={isReserving}
            aria-busy={isReserving}
          >
            {isReserving ? "Reserving..." : `Reserve ${mediumDetails.format}`}
          </button>
        </div>
      )}

      {isAuthenticated && reserved && (
        <div
          className="py-2 text-xl font-bold text-primary-red"
          aria-live="polite"
        >
          Reserved!
        </div>
      )}

      {/*If the user is not authenticated, display the login button for redirection to the Auth0 login.*/}
      {!isAuthenticated && <Auth0LoginRedirectBtn />}
    </div>
  );
}
