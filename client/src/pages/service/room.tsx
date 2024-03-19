import React, { useState } from "react";
import RoomCapacity from "../../component/room/roomCapacity";
import RoomEquipment from "../../component/room/roomEquipment";
import TimeTable from "../../component/room/timeTable";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "../../types/room";
import { fetchRoomInfo } from "../../api/fetchRoom/fetchRoom";

export default function RoomFilter() {
  const [filters, setFilters] = useState<Filter>({ size: [], equipment: [] });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["availability"],
    queryFn: fetchRoomInfo,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (data) {
    const roomSizeHandler = (size: number[]) => {
      setFilters((prevFilter) => {
        const newFilter = { ...prevFilter };
        newFilter.size = size;
        return newFilter;
      });
    };

    const equipmentHandler = (equipmentList: string[]) => {
      setFilters((prevFilter) => {
        const newFilter = { ...prevFilter };
        newFilter.equipment = equipmentList;
        return newFilter;
      });
    };

    return (
      <>
        <div className="flex h-full gap-4 overflow-x-auto p-4 pt-40">
          <div className="w-1/5 min-w-max">
            <RoomCapacity roomSize={data.roomSize} onSelect={roomSizeHandler} />
            <RoomEquipment
              equipmentCategory={data.equipmentCategory}
              onSelect={equipmentHandler}
            />
          </div>
          <div className="w-4/5 min-w-max">
            <TimeTable
              filters={filters}
              dateList={data.dateList}
              timeSlotList={data.timeSlotList}
              availabilityList={data.availabilityList}
            />
          </div>
        </div>
      </>
    );
  }
}
