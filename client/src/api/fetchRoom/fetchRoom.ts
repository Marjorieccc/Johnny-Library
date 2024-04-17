import { TimeTableInfo } from "../../types/roomType";
import {
  convertAvailabilityList,
  convertDateList,
  convertTimeSlotList,
} from "../../utils/timeTableUtils";

export async function fetchRoomInfo() {
  const response = await fetch(`http://localhost:8080/rooms`);

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error);
  }

  const rawData = await response.json();
  if (rawData.dateList) {
    rawData.dateList = convertDateList(rawData.dateList);
  }
  if (rawData.timeSlotList) {
    rawData.timeSlotList = convertTimeSlotList(rawData.timeSlotList);
  }
  if (rawData.availabilityList) {
    rawData.availabilityList = convertAvailabilityList(
      rawData.availabilityList,
    );
  }

  const timeTableInfo: TimeTableInfo = rawData;
  return timeTableInfo;
}
