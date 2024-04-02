import React, { useState, useRef } from "react";
import { combineDateAndTime } from "../../utils/timeTableUtils";
import {
  TimeTableProps,
  DisplayDate,
  RoomModalProps,
  TimeSlot,
} from "../../types/room";
import "primeicons/primeicons.css";
import RoomModal from "./roomModal";

const NO_OF_DAYS_SHOWN = 7;

export default function TimeTable({
  filters,
  dateList,
  timeSlotList,
  availabilityList,
}: TimeTableProps) {
  const modalProps = useRef<RoomModalProps>({
    timeSlot: { start: new Date(), end: new Date() },
    roomList: [],
    closeHandler: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DisplayDate>({
    startIdx: -1,
    endIdx: -1,
  });

  if (dateRange.startIdx === -1) {
    if (dateList.length > NO_OF_DAYS_SHOWN) {
      setDateRange({ startIdx: 0, endIdx: NO_OF_DAYS_SHOWN });
    } else {
      setDateRange({ startIdx: 0, endIdx: dateList.length });
    }
  }

  const prevPage = () => {
    setDateRange((prevDateRange) => {
      const newDateRange = { ...prevDateRange };
      newDateRange.startIdx -= NO_OF_DAYS_SHOWN;
      newDateRange.endIdx -= NO_OF_DAYS_SHOWN;
      if (newDateRange.startIdx < 0) {
        newDateRange.startIdx = 0;
        newDateRange.endIdx = newDateRange.startIdx + NO_OF_DAYS_SHOWN;
      }
      return newDateRange;
    });
  };

  const nextPage = () => {
    setDateRange((prevDateRange) => {
      const newDateRange = { ...prevDateRange };
      newDateRange.startIdx += NO_OF_DAYS_SHOWN;
      newDateRange.endIdx += NO_OF_DAYS_SHOWN;
      if (newDateRange.endIdx > dateList.length) {
        newDateRange.endIdx = dateList.length;
        newDateRange.startIdx = newDateRange.endIdx - NO_OF_DAYS_SHOWN;
      }
      return newDateRange;
    });
  };

  const getAvailableRooms = (timeSlot: TimeSlot) => {
    if (timeSlot.end <= new Date()) {
      return [];
    }

    const date = availabilityList.find(
      (element) =>
        element.date.getFullYear() === timeSlot.start.getFullYear() &&
        element.date.getMonth() === timeSlot.start.getMonth() &&
        element.date.getDate() === timeSlot.start.getDate(),
    );
    const session = date?.availability.find((session) => {
      return session.timeSlot.start.getTime() === timeSlot.start.getTime()
        ? true
        : false;
    });
    return (
      session?.availableRooms.filter((room) => {
        return (
          (!filters.size.length ||
            filters.size.some((size) => size === room.size)) &&
          filters.equipment.every((equipment) =>
            room.equipment.includes(equipment),
          )
        );
      }) || []
    );
  };

  const dateListForDisplay = dateList.slice(
    dateRange.startIdx,
    dateRange.endIdx,
  );

  return (
    <>
      {showModal && (
        <RoomModal
          timeSlot={modalProps.current.timeSlot}
          roomList={modalProps.current.roomList}
          closeHandler={modalProps.current.closeHandler}
        />
      )}
      <table className="w-full min-w-max text-xs md:text-base">
        <thead>
          <tr className="h-12">
            <th></th>
            <th colSpan={NO_OF_DAYS_SHOWN}>
              <div className="flex items-center">
                <div className="basis-1/12">
                  <button
                    className={dateRange.startIdx ? "" : "hidden"}
                    onClick={(_) => prevPage()}
                  >
                    <i className="pi pi-angle-left" />
                  </button>
                </div>
                <div className="basis-10/12 text-sm font-normal text-gray-700 underline md:text-xl">
                  Select A Time Slot
                </div>
                <div className="basis-1/12">
                  <button
                    className={
                      dateRange.endIdx === dateList.length ? "hidden" : ""
                    }
                    onClick={(_) => nextPage()}
                  >
                    <i className="pi pi-angle-right" />
                  </button>
                </div>
              </div>
            </th>
          </tr>
          <tr className="h-10 md:hidden">
            <th></th>
            {dateListForDisplay.map((date) => {
              return (
                <th key={date.toISOString()} className="px-2 font-normal">
                  {date.toLocaleDateString("en-US", {
                    timeZone: "America/Toronto",
                    month: "short",
                  })}
                  <br />
                  {date.toLocaleDateString("en-US", {
                    timeZone: "America/Toronto",
                    day: "2-digit",
                  })}
                </th>
              );
            })}
          </tr>
          <tr className="h-10 max-md:hidden">
            <th></th>
            {dateListForDisplay.map((date) => {
              return (
                <th className="px-2 font-normal" key={date.toISOString()}>
                  {date.toLocaleDateString("en-US", {
                    timeZone: "America/Toronto",
                    month: "short",
                    day: "2-digit",
                  })}
                  <br />
                  {date.toLocaleDateString("en-US", {
                    timeZone: "America/Toronto",
                    weekday: "short",
                  })}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {timeSlotList.map((timeSlot, index) => {
            return (
              <tr key={index} className="h-10">
                <td className="w-10 pr-2 text-right md:hidden">
                  {timeSlot.start.toLocaleTimeString("en-US", {
                    timeZone: "America/Toronto",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="w-[8rem] pr-2 text-right max-md:hidden">
                  {timeSlot.start.toLocaleTimeString("en-US", {
                    timeZone: "America/Toronto",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  }) +
                    " - " +
                    timeSlot.end.toLocaleTimeString("en-US", {
                      timeZone: "America/Toronto",
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </td>
                {dateListForDisplay.map((date, idx) => {
                  const bookingTimeSlot = {
                    start: combineDateAndTime(date, timeSlot.start),
                    end: combineDateAndTime(date, timeSlot.end),
                  };
                  const availableRooms = getAvailableRooms(bookingTimeSlot);
                  return (
                    <td
                      className={
                        "border-2 border-dotted border-gray-500 " +
                        (availableRooms.length
                          ? "bg-lime-100 hover:cursor-pointer hover:bg-lime-300"
                          : "")
                      }
                      key={idx}
                      onClick={
                        availableRooms.length
                          ? (_) => {
                              modalProps.current = {
                                timeSlot: bookingTimeSlot,
                                roomList: availableRooms,
                                closeHandler: () => setShowModal(false),
                              };
                              setShowModal(true);
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
