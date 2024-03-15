import { Room, RoomBookingInfo, Equipment, RoomSize } from "../types/room";

export async function fetchRoomSize() {
  let list: { roomSize: RoomSize[] } = { roomSize: [] };
  try {
    // TO DO: REPLACE PATH
    const res = await fetch("/roomSize.json");
    list = await res.json();
  } catch (err) {
    throw new Error("Error: " + err);
  }
  return list;
}

export async function fetchRoomList() {
  let list: { roomList: Room[] } = { roomList: [] };
  try {
    // TO DO: REPLACE PATH
    const res = await fetch("/roomList.json");
    list = await res.json();
  } catch (err) {
    throw new Error("Error: " + err);
  }
  return list;
}

export async function fetchRoomBookingRecords() {
  let list: { booking: RoomBookingInfo[] } = { booking: [] };
  try {
    // TO DO: REPLACE PATH
    const res = await fetch("/booking.json");
    list = await res.json();

    // TO BE REMOVED
    list.booking.forEach((record) => {
      record.timeSlot.start = new Date(record.timeSlot.start);
      record.timeSlot.end = new Date(record.timeSlot.end);
    });
  } catch (err) {
    throw new Error("Error: " + err);
  }
  return list;
}

export async function fetchEquipmentList() {
  let list: { equipmentList: Equipment[] } = { equipmentList: [] };
  try {
    // TO DO: REPLACE PATH
    const res = await fetch("/equipmentList.json");
    list = await res.json();
  } catch (err) {
    throw new Error("Error: " + err);
  }
  return list;
}
