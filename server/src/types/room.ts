export type TimeSlot = {
  start: Date;
  end: Date;
}

export type RoomBookingInfo = {
  _id: number;
  roomId: number;
  userId: number;
  timeSlot: TimeSlot;
}

export type Equipment = {
  _id: number;
  category: string;
  desc: string;
  roomId: number;
  status: boolean;
}

export type RoomSize = {
  _id: number;
  capacity: string;
}

export type Room = {
  _id: number;
  name: string;
  desc: string;
  size: number;
}
