import { RoomBookingInfo } from "../../types/room";

export async function fetchRoomBookingByUserId(
  id: string,
  accessToken: string,
) {
  const response = await fetch(`http://localhost:8080/rooms/user/${id}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error);
  }
  const bookings: RoomBookingInfo[] = await response.json();
  return bookings;
}
