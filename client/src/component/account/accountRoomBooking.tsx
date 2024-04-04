import React from 'react'

import { useAccountDetails } from "../../context/AccountDetailsProvider";
import { useAuth0 } from "@auth0/auth0-react";

export default function AccountRoomBooking() {
  const { reservations } = useAccountDetails();
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <p>Add Room Booking List here</p>
    </div>
  );
}
