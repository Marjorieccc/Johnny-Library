import {
  Equipment,
  Room,
  RoomBookingInfo,
  TimeSlot,
} from "../types/room";
import {
  fetchEquipmentList,
  fetchRoomBookingRecords,
  fetchRoomList,
  fetchRoomSize,
} from "../queries/roomQuery";

// 24-hours
const OPENING_TIME = "09:00";
const CLOSING_TIME = "17:00";

// For Booking
const NO_OF_DAYS = 20;
const SECTION_INTERVAL = 60; // Unit: minutes

class TimeTableClass {
  private static getRoomList = async () => {
    const res = await fetchRoomList();
    return res.roomList;
  };

  private static getRoomSize = async () => {
    const res = await fetchRoomSize();
    return res.roomSize;
  };

  private static getBookingHistory = async () => {
    const bookingHistory = await fetchRoomBookingRecords();
    return bookingHistory.booking;
  };

  private static getEquipmentList = async () => {
    const res = await fetchEquipmentList();
    return res.equipmentList;
  };

  private static getEquipmentCategory = (equipmentList: Equipment[]) => {
    return [...new Set(equipmentList.map((equipment) => equipment.category))];
  };

  private static getDates = (
    dayCount: number,
    timeZone = "America/Toronto"
  ) => {
    const dateList: Date[] = [];
    for (let i = 0; i < dayCount; ++i) {
      const currDateStr = new Date().toLocaleString("en-US", {
        timeZone: timeZone,
        hour12: false,
      });
      const date = new Date(currDateStr);
      date.setDate(date.getDate() + i);
      dateList.push(date);
    }
    return dateList;
  };

  private static getTimeSlots = (
    startTime: string,
    endTime: string,
    interval: number,
    refDate: Date
  ) => {
    const timeSlotList: TimeSlot[] = [];
    if (!startTime.includes(":") || !endTime.includes(":")) {
      throw new Error("Error: Invalid Opening/Closing Time format");
    }

    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const start = new Date(refDate.getTime());
    start.setHours(+startHour, +startMinute, 0);

    const end = new Date(refDate.getTime());
    end.setHours(+endHour, +endMinute, 0);

    if (start > end) {
      throw new Error("Error: Invalid Opening/Closing Time");
    }

    while (start < end) {
      const timeSlotStart = new Date(start.getTime());
      start.setMinutes(start.getMinutes() + interval);

      const timeSlotEnd = new Date(start.getTime());

      if (end >= timeSlotEnd) {
        const timeSlot = {
          start: timeSlotStart,
          end: timeSlotEnd,
        };
        timeSlotList.push(timeSlot);
      }
    }
    return timeSlotList;
  };

  private static getAvailabilityByDate = (
    date: Date,
    roomList: Room[],
    bookingHistory: RoomBookingInfo[]
  ) => {
    const timeSlotList = this.getTimeSlots(
      OPENING_TIME,
      CLOSING_TIME,
      SECTION_INTERVAL,
      date
    );

    const availability = timeSlotList.map((timeSlot) => {
      const availableRooms = roomList.filter((room) => {
        return bookingHistory.every((booking) => {
          return !(
            booking.roomId === room._id &&
            booking.timeSlot.end > timeSlot.start &&
            booking.timeSlot.start < timeSlot.end
          );
        });
      });
      return { timeSlot: timeSlot, availableRooms: availableRooms };
    });

    return { date: date, availability: availability };
  };

  static getTimeTableInfo = async () => {
    const roomList = await this.getRoomList();
    const roomSize = await this.getRoomSize();
    const bookingHistory = await this.getBookingHistory();
    const equipmentList = await this.getEquipmentList();

    const DetailedRoomList = roomList.map((room) => {
      const equipment = equipmentList.filter((equipment) => {
        return equipment.roomId === room._id && equipment.status;
      });
      const equipmentCategory = [
        ...new Set(equipment.map((equipment) => equipment.category)),
      ];
      return { ...room, equipment: equipmentCategory };
    });

    const equipmentCategory = this.getEquipmentCategory(equipmentList);

    const dateList = this.getDates(NO_OF_DAYS);
    const timeSlotList = this.getTimeSlots(
      OPENING_TIME,
      CLOSING_TIME,
      SECTION_INTERVAL,
      dateList[0]
    );

    const availabilityList = dateList.map((date) =>
      this.getAvailabilityByDate(date, DetailedRoomList, bookingHistory)
    );

    return {
      roomSize: roomSize,
      equipmentCategory: equipmentCategory,
      dateList: dateList,
      timeSlotList: timeSlotList,
      availabilityList: availabilityList,
    };
  };
}

export default TimeTableClass;
