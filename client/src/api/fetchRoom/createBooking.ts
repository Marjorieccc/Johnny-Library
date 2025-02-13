import { RoomBookingInfo, SubmitBookingDetails } from "../../types/roomType";
import { BACKEND_URL } from "../route";

export async function createBooking(
  data: SubmitBookingDetails,
  auth0Token: string
) {
  const response = await fetch(`${BACKEND_URL}/rooms/roombooking/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth0Token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error);
  }
  const booking: RoomBookingInfo = await response.json();
  return booking;
}
