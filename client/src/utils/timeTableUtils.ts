import { AvailabilityList, TimeSlot } from "../types/room";

export const combineDateAndTime = function (date: Date, time: Date) {
  const combinedDate = new Date(date.getTime());
  combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combinedDate;
};

export const convertDateList = function (dates: string[]) {
  return dates.map((date) => new Date(date));
};

export const convertTimeSlotList = function (timeSlots: TimeSlot[]) {
  return timeSlots.map((timeSlot) => {
    return { start: new Date(timeSlot.start), end: new Date(timeSlot.end) };
  });
};

export const convertAvailabilityList = function (list: AvailabilityList[]) {
  return list.map((item) => {
    const date = new Date(item.date);
    const availability = item.availability.map((detail) => {
      const timeSlot = {
        start: new Date(detail.timeSlot.start),
        end: new Date(detail.timeSlot.end),
      };
      return { timeSlot: timeSlot, availableRooms: detail.availableRooms };
    });
    return { date: date, availability: availability };
  });
};
