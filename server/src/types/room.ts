import { Types } from "mongoose";

export type TimeSlot = {
  start: Date;
  end: Date;
};

export type RoomBookingRecord = {
  room: Types.ObjectId;
  user: string;
  timeSlot: TimeSlot;
};

export type Equipment = {
  category: string;
  desc: string;
  room: Types.ObjectId;
  status: boolean;
};

export type RoomSize = {
  capacity: string;
};

export type Room = {
  name: string;
  desc: string;
  size: Types.ObjectId;
  image: string;
};

export type User = {
  username: string;
  email: string;
  phone: string;
};