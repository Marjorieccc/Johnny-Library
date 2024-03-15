import { TimeTableInfo } from "../../types/room";

export async function fetchRoomInfo() {
  let timeTableInfo: TimeTableInfo = {
    roomSize: [],
    dateList: [],
    timeSlotList: [],
    equipmentCategory: [],
    availabilityList: [],
  };

  try {
    const response = await fetch(`http://localhost:8080/rooms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    timeTableInfo = await response.json();
  } catch (error) {
    console.error("Error fetching resource:", error);
  }
  return timeTableInfo;
}
