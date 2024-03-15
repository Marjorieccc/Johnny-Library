import React, { useState } from "react";
import { formatTime, formatDate, combineDateAndTime } from "../../utils/timeTableUtils";
import { TimeTableProps, DisplayDate } from "../../types/room";

const NO_OF_DAYS_SHOWN = 7;

export default function TimeTable({
  filters,
  dateList,
  timeSlotList,
  availabilityList,
}: TimeTableProps) {
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

  const getAvailableRooms = (startTime: Date, endTime: Date) => {
    const currDateStr = new Date().toLocaleString("en-US", {
      timeZone: "America/Toronto",
      hour12: false,
    });
    if (endTime < new Date(currDateStr)) {
      return [];
    }

    const date = availabilityList.find(
      (element) =>
        element.date.getFullYear() === startTime.getFullYear() &&
        element.date.getMonth() === startTime.getMonth() &&
        element.date.getDate() === startTime.getDate()
    );
    const session = date?.availability.find((session) => {
      return session.timeSlot.start.getTime() === startTime.getTime()
        ? true
        : false;
    });
      return session?.availableRooms.filter((room) => {
        return (
          !filters.size.length ||
          (filters.size.some((size) => size === room.size) &&
            filters.equipment.every((equipment) =>
              room.equipment?.includes(equipment)
            ))
        );
      }) || [];
    }

  const dateListForDisplay = dateList.slice(
    dateRange.startIdx,
    dateRange.endIdx
  );

  return (
    <table className="w-full h-full">
      <thead>
        <tr>
          <th></th>
          <th colSpan={NO_OF_DAYS_SHOWN}>
            <div className="flex">
              <div className="basis-1/12">
                <button
                  className={dateRange.startIdx ? "" : "hidden"}
                  onClick={(_) => prevPage()}
                >
                  Prev
                </button>
              </div>
              <div className="text-gray-700 font-bold text-xl basis-10/12"></div>
              <div className="basis-1/12">
                <button
                  className={
                    dateRange.endIdx === dateList.length ? "hidden" : ""
                  }
                  onClick={(_) => nextPage()}
                >
                  Next
                </button>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th></th>
          {dateListForDisplay.map((date, index) => {
            return (
              <th className="font-normal px-2" key={index}>
                {formatDate(date)}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="">
        {timeSlotList.map((timeSlot, index) => {
          return (
            <tr key={index}>
              <td className="pr-2 text-right">
                {formatTime(timeSlot.start) + " - " + formatTime(timeSlot.end)}
              </td>
              {dateListForDisplay.map((date) => {
                const start = combineDateAndTime(date, timeSlot.start);
                const end = combineDateAndTime(date, timeSlot.end);
                const availableRooms = getAvailableRooms(start, end);
                return (
                  <td
                    className={
                      "border-dotted border-2 border-gray-500 " +
                      (availableRooms.length ? "bg-lime-100" : "")
                    }
                    key={date.toISOString()}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
