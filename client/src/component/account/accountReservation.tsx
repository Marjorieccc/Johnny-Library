import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { useAccountDetails } from "../../context/accountDetailsProvider";
import Auth0LoginRedirectBtn from "../auth0/auth0LoginRedirectBtn";

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
