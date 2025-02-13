import { TimeTableInfo } from "../../types/roomType";
import {
  convertAvailabilityList,
  convertDateList,
  convertTimeSlotList,
} from "../../utils/timeTableUtils";
import { BACKEND_URL } from "../route";

export async function fetchRoomInfo() {
  const response = await fetch(`${BACKEND_URL}/rooms`);

  if (!response.ok) {
    const err = await response.json();
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
      rawData.availabilityList
    );
  }

  const timeTableInfo: TimeTableInfo = rawData;
  return timeTableInfo;
}
