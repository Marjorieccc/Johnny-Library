import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useAccountDetails } from "../../context/accountDetailsProvider";
import Auth0LoginRedirectBtn from "../auth0/auth0LoginRedirectBtn";

export default function AccountRoomBooking() {
  const { roomBookingRecords } = useAccountDetails();
  const { isAuthenticated } = useAuth0();
  
  return (
    <div>
      {isAuthenticated && roomBookingRecords && (
        <ul className="grid grid-cols-1 overflow-hidden divide-y divide-dotted ">
          {roomBookingRecords.map((booking) => {
            const startDate = new Date(booking.timeSlot.start);
            const endDate = new Date(booking.timeSlot.end);
            return (
              <li key={booking._id}>
                <div className="my-2">
                  <span className="text-sm font-bold">BookingID: </span>
                  <span className="text-sm text-gray-500">{booking._id}</span>
                  <p>
                    <span className="text-sm font-bold">Timeslot: </span>
                    <span className="text-sm text-gray-500">
                      {startDate.toLocaleString("en-CA", {
                        timeZone: "America/Toronto",
                        year: "numeric",
                        month: "numeric",
                        day: "2-digit",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - 
                      {endDate.toLocaleString("en-CA", {
                        timeZone: "America/Toronto",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</span>
                  </p>
                </div>
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
