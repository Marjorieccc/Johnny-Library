import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useAccountDetails } from "../../context/AccountDetailsProvider";
import Auth0LoginRedirectBtn from "../auth0/Auth0LoginRedirectBtn";

const listStyle = `
  border 
  border-gray-300 
  rounded-md 
  overflow-hidden`;

export default function AccountRoomBooking() {
  const { roomBookingRecords } = useAccountDetails();
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated && roomBookingRecords && (
        <ul className={listStyle}>
          {roomBookingRecords.map((booking) => {
            const startDate = new Date(booking.timeSlot.start);
            const endDate = new Date(booking.timeSlot.end);
            return (
              <li key={booking._id}>
                <p>BookingID: {booking._id}</p>
                <p>Timeslot: {startDate.toISOString()} - {endDate.toISOString()}</p>
              </li>
            );
          })}
        </ul>
      )}
      {isAuthenticated && roomBookingRecords.length === 0 && <p>No Booking</p>}
      {!isAuthenticated && <Auth0LoginRedirectBtn />}
    </div>
  );
}
