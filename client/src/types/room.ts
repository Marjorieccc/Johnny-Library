export type TimeSlot = {
  start: Date;
  end: Date;
};

export type RoomBookingInfo = {
  _id: string;
  room: string;
  user: string;
  timeSlot: TimeSlot;
};

export type Equipment = {
  _id: string;
  category: string;
  desc: string;
  room: string;
  status: boolean;
};

export type RoomSize = {
  _id: string;
  capacity: string;
};

export type Room = {
  _id: string;
  name: string;
  desc: string;
  size: string;
  image: string;
  equipment: string[];
};

export type AvailabilityList = {
  date: Date;
  availability: {
    timeSlot: TimeSlot;
    availableRooms: Room[];
  }[];
};

export type Filter = {
  size: string[];
  equipment: string[];
};

export type RoomEquipmentProps = {
  equipmentCategory: string[];
  onSelect: (equipmentList: string[]) => void;
};

export type RoomCapacityProps = {
  roomSize: RoomSize[];
  onSelect: (roomSize: string[]) => void;
};

export type TimeTableInfo = {
  roomSize: RoomSize[];
  dateList: Date[];
  timeSlotList: TimeSlot[];
  equipmentCategory: string[];
  availabilityList: AvailabilityList[];
};

export type TimeTableProps = {
  filters: Filter;
  dateList: Date[];
  timeSlotList: TimeSlot[];
  availabilityList: AvailabilityList[];
};

export type DisplayDate = {
  startIdx: number;
  endIdx: number;
};

export type RoomModalProps = {
  timeSlot: TimeSlot;
  roomList: Room[];
  closeHandler: null | (() => void);
};

export type RoomDetails = {
  room: Room;
  size: RoomSize;
};

export type SubmitBookingDetails = {
  room: string;
  timeSlot: TimeSlot;
  userId: string;
};
