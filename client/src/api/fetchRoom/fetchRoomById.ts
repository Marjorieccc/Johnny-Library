import { RoomDetails } from "../../types/roomType";
import { BACKEND_URL } from "../route";

export async function fetchRoomById(id: string) {
  const response = await fetch(`${BACKEND_URL}/rooms/${id}`);
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error);
  }
  const roomDetails: RoomDetails = await response.json();
  return roomDetails;
}
