import React, { useEffect } from "react";
import { useAccountDetails } from "../../context/AccountDetailsProvider";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0LoginRedirectBtn from "../auth0/Auth0LoginRedirectBtn";
import { NavLink } from "react-router-dom";

const listStyle = `
  border 
  border-gray-300 
  rounded-md 
  overflow-hidden`;

export default function AccountReservation() {
  const { reservations } = useAccountDetails();
  const { isAuthenticated } = useAuth0();
 
  return (
    <div>
      {isAuthenticated && reservations && (
        <ul className={listStyle}>
          {reservations.map((reservation: any) => (
            <li key={reservation._id}>
              <NavLink to={`/resource/${reservation.resourceID}`}>
                <span>Title: {reservation.resourceTitle} </span>
                <span>Format: {reservation.format}</span>
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
