import mongoose, { Schema } from "mongoose";
import {
  RoomBookingRecord,
  Room,
  RoomSize,
  User,
  Equipment,
} from "../types/room";

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { collection: "Users" }
);

const roomBookingRecordSchema = new Schema<RoomBookingRecord>(
  {
    room: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    timeSlot: {
      type: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
      required: true,
      _id: false,
    },
  },
  { collection: "Room_booking_records" }
);

const equipmentSchema = new Schema<Equipment>(
  {
    category: { type: String, required: true },
    desc: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, required: true },
    status: { type: Boolean, required: true },
  },
  { collection: "Equipments" }
);

const roomSizeSchema = new Schema<RoomSize>(
  {
    capacity: { type: String, required: true },
  },
  { collection: "Room_sizes" }
);

const roomSchema = new Schema<Room>(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    size: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true },
  },
  { collection: "Rooms" }
);

export const UserModel = mongoose.model<User>("Users", userSchema);
export const RoomBookingRecordModel = mongoose.model<RoomBookingRecord>(
  "Room_booking_records",
  roomBookingRecordSchema
);
export const EquipmentModel = mongoose.model<Equipment>(
  "Equipments",
  equipmentSchema
);
export const RoomSizeModel = mongoose.model<RoomSize>(
  "Room_sizes",
  roomSizeSchema
);
export const RoomModel = mongoose.model<Room>("Rooms", roomSchema);