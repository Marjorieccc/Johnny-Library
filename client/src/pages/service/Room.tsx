import React, { useState } from "react";
import RoomCapacity from "../../component/room/RoomCapacity"; 
import RoomEquipment from "../../component/room/RoomEquipment";
import TimeTable from "../../component/room/TimeTable";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "../../types/roomType";
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
    return <h1>{error.message}</h1>;
  }
  if (!data) {
    return <>Error</>;
  } else {
    const roomSizeHandler = (size: string[]) => {
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
        <div className="flex flex-col h-full gap-4 p-4 pt-10 lg:pt-20 lg:flex-row font-roboto">
          <div className="mx-auto flex w-full min-w-max flex-col gap-2 lg:w-[15%]">
            <RoomCapacity roomSize={data.roomSize} onSelect={roomSizeHandler} />
            <RoomEquipment
              equipmentCategory={data.equipmentCategory}
              onSelect={equipmentHandler}
            />
          </div>
          <div className="lg:w-[85%} w-full">
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
