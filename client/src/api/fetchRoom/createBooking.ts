import { RoomBookingInfo, SubmitBookingDetails } from "../../types/room";

export async function createBooking(data: SubmitBookingDetails) {
  const response = await fetch("http://localhost:8080/rooms/roombooking/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error);
  }
  const booking: RoomBookingInfo = await response.json();
  return booking;
}
