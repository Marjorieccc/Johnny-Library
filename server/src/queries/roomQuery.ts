import { NextFunction, Request, Response } from "express";
import {
  EquipmentModel,
  RoomBookingRecordModel,
  RoomModel,
  RoomSizeModel,
} from "../models/roomModel";
import Logging from "../logging/logging";
import { Equipment, Room, RoomBookingRecord, TimeSlot } from "../types/room";
import { Types } from "mongoose";

// 24-hours
export const OPENING_TIME = "09:00";
export const CLOSING_TIME = "17:00";

// For Booking
export const NO_OF_DAYS = 10;
export const SECTION_INTERVAL = 60; // Unit: minutes

const getEquipmentCategory = function (equipmentList: Equipment[]) {
  return [...new Set(equipmentList.map((equipment) => equipment.category))];
};

const getDates = function (dayCount: number) {
  const dateList: Date[] = [];
  for (let i = 0; i < dayCount; ++i) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dateList.push(date);
  }
  return dateList;
};

const getTimeSlots = function (
  startTime: string,
  endTime: string,
  interval: number,
  refDate: Date
) {
  const timeSlotList: TimeSlot[] = [];
  if (!startTime.includes(":") || !endTime.includes(":")) {
    throw new Error("Error: Invalid Opening/Closing Time format");
  }

  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  const start = new Date(refDate.getTime());
  start.setHours(+startHour, +startMinute, 0, 0);

  const end = new Date(refDate.getTime());
  end.setHours(+endHour, +endMinute, 0, 0);

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

const getAvailabilityByDate = function (
  date: Date,
  roomList: (Room & { _id: Types.ObjectId; equipment: string[] })[],
  bookingHistory: (RoomBookingRecord & { _id: Types.ObjectId })[]
) {
  const timeSlotList = getTimeSlots(
    OPENING_TIME,
    CLOSING_TIME,
    SECTION_INTERVAL,
    date
  );

  const availability = timeSlotList.map((timeSlot) => {
    const availableRooms = roomList.filter((room) => {
      return bookingHistory.every((booking) => {
        return !(
          booking.room.toString() === room._id.toString() &&
          booking.timeSlot.end > timeSlot.start &&
          booking.timeSlot.start < timeSlot.end
        );
      });
    });
    return { timeSlot: timeSlot, availableRooms: availableRooms };
  });

  return { date: date, availability: availability };
};

export const getTimeTableInfo = async function (_: Request, res: Response) {
  try {
    const roomSize = await RoomSizeModel.find({}).exec();
    const roomList = await RoomModel.find({}).sort({ name: 1 }).exec();
    const equipmentList = await EquipmentModel.find({ status: true }).exec();
    const equipmentCategory = getEquipmentCategory(equipmentList);
    const bookingHistory = await RoomBookingRecordModel.find({
      "timeSlot.start": { $gt: new Date() },
    }).exec();

    const dateList = getDates(NO_OF_DAYS);
    const timeSlotList = getTimeSlots(
      OPENING_TIME,
      CLOSING_TIME,
      SECTION_INTERVAL,
      dateList[0]
    );

    const detailedRoomList = roomList.map((room) => {
      const equipment = equipmentList.filter((equipment) => {
        return equipment.room.toString() === room._id.toString();
      });
      const equipmentCategory = getEquipmentCategory(equipment);
      return { ...room.toObject(), equipment: equipmentCategory };
    });

    const availabilityList = dateList.map((date) =>
      getAvailabilityByDate(date, detailedRoomList, bookingHistory)
    );

    res.status(200).json({
      dateList: dateList,
      timeSlotList: timeSlotList,
      roomSize: roomSize,
      equipmentCategory: equipmentCategory,
      availabilityList: availabilityList,
    });
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ error: "Failed to retrieve booking information" });
  }
};

export const getRoomById = async function (req: Request, res: Response) {
  if (req.params.id) {
    try {
      const room = await RoomModel.findOne({
        _id: new Types.ObjectId(req.params.id),
      }).exec();

      if (!room) {
        res.status(404).json({ error: "Room Id does not exist" });
      } else {
        const equipmentList = await EquipmentModel.find(
          {
            room: new Types.ObjectId(req.params.id),
            status: true,
          },
          "category"
        ).exec();

        const equipmentCategory = getEquipmentCategory(equipmentList);

        const detailedRoom = {
          ...room.toObject(),
          equipment: equipmentCategory,
        };

        const roomSize = await RoomSizeModel.findOne({
          _id: new Types.ObjectId(room?.size),
        }).exec();

        res.status(200).json({
          room: detailedRoom,
          size: roomSize,
        });
      }
    } catch (error) {
      Logging.error(error);
      res.status(500).json({ error: "Failed to retrieve room details" });
    }
  } else {
    res.status(400).json({ error: "Invalid room info" });
  }
};

export async function getRoomByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const RoomBookingsByUserID = await RoomBookingRecordModel.find({
      user: req.params.id,
    });
    if (!RoomBookingsByUserID) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(RoomBookingsByUserID);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
