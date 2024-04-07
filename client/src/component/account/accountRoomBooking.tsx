import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useAccountDetails } from "../../context/AccountDetailsProvider";

export default function AccountRoomBooking() {
  const { reservations } = useAccountDetails();
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <p>Add Room Booking List here</p>
    </div>
  );
}
