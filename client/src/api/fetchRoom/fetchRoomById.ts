import { RoomDetails } from "../../types/roomType";

export async function fetchRoomById(id: string) {
  const response = await fetch(`http://localhost:8080/rooms/${id}`);
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error);
  }
  const roomDetails: RoomDetails = await response.json();
  return roomDetails;
}