export type TimeSlot = {
  start: Date;
  end: Date;
}

export type RoomBookingInfo = {
  _id: number;
  roomId: number;
  userId: number;
  timeSlot: TimeSlot;
};

export type Equipment = {
  _id: number;
  category: string;
  desc: string;
  roomId: number;
  status: boolean;
};

export type RoomSize = {
  _id: number;
  capacity: string;
};

export type Room = {
  _id: number;
  name: string;
  desc: string;
  size: number;
  equipment: string[];
};

export type Filter = {
  size: number[];
  equipment: string[];
};

export type RoomEquipmentProps = {
  equipmentCategory: string[]
  onSelect: (equipmentList: string[]) => void
}

export type RoomCapacityProps = {
  roomSize: RoomSize[];
  onSelect: (roomSize: number[]) => void;
};

export type TimeTableInfo = {
  roomSize: RoomSize[];
  dateList: Date[];
  timeSlotList: TimeSlot[];
  equipmentCategory: string[];
  availabilityList: {
    date: Date;
    availability: {
      timeSlot: TimeSlot;
      availableRooms: Room[];
    }[];
  }[];
};

export type TimeTableProps = {
  filters: Filter;
  dateList: Date[];
  timeSlotList: TimeSlot[];
  availabilityList: {
    date: Date;
    availability: {
      timeSlot: TimeSlot;
      availableRooms: Room[];
    }[];
  }[];
}

export type DisplayDate = {
  startIdx: number;
  endIdx: number;
};