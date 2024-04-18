import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { useAccountDetails } from "../../context/accountDetailsProvider";
import Auth0LoginRedirectBtn from "../auth0/auth0LoginRedirectBtn";

export default function AccountReservation() {
  const { reservations } = useAccountDetails();
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && reservations && (
        <ul className="grid grid-cols-1 overflow-hidden divide-y divide-dotted ">
          {reservations.map((reservation: any) => (
            <li key={reservation._id}>
              <NavLink to={`/resource/${reservation.resourceID}`}>
                <div className="my-2">
                  <span className="text-sm lg:text-base lg:font-bold">{reservation.resourceTitle} </span>
                  <button className="px-1 py-1 mx-4 my-2 text-sm border border-red-800 rounded-md">{reservation.format}</button>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {isAuthenticated && reservations.length === 0 && <p>No reservation</p>}
      {!isAuthenticated && <Auth0LoginRedirectBtn />}
    </div>
  );
}
