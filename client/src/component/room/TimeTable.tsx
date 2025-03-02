// Updated TimeTable.tsx with accessibility improvements
import React, { useState, useRef } from "react";
import { combineDateAndTime } from "../../utils/timeTableUtils";
import {
  TimeTableProps,
  DisplayDate,
  RoomModalProps,
  TimeSlot,
} from "../../types/roomType";
import "primeicons/primeicons.css";
import RoomModal from "./RoomModal";

const NO_OF_DAYS_SHOWN = 7;

export default function TimeTable({
  filters,
  dateList,
  timeSlotList,
  availabilityList,
}: TimeTableProps) {
  // Reference to store modal properties when a time slot is clicked
  const modalProps = useRef<RoomModalProps>({
    timeSlot: { start: new Date(), end: new Date() },
    roomList: [],
    closeHandler: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  // State to manage which date range is currently displayed
  const [dateRange, setDateRange] = useState<DisplayDate>({
    startIdx: -1,
    endIdx: -1,
  });

  // Initialize date range on first render
  if (dateRange.startIdx === -1) {
    if (dateList.length > NO_OF_DAYS_SHOWN) {
      setDateRange({ startIdx: 0, endIdx: NO_OF_DAYS_SHOWN });
    } else {
      setDateRange({ startIdx: 0, endIdx: dateList.length });
    }
  }

  /**
   * Navigates to the previous page of dates
   * Decreases the start and end indices by the number of days shown
   */
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

  /**
   * Navigates to the next page of dates
   * Increases the start and end indices by the number of days shown
   */
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

  /**
   * Filters available rooms for a given time slot based on user-selected filters
   *
   * @param timeSlot - The time slot to check availability for
   * @returns Array of rooms that are available and match the filters
   */
  const getAvailableRooms = (timeSlot: TimeSlot) => {
    // No rooms are available for time slots in the past
    if (timeSlot.end <= new Date()) {
      return [];
    }

    // Find the date entry in availability list
    const date = availabilityList.find(
      (element) =>
        element.date.getFullYear() === timeSlot.start.getFullYear() &&
        element.date.getMonth() === timeSlot.start.getMonth() &&
        element.date.getDate() === timeSlot.start.getDate()
    );

    // Find the specific time slot in that date's availability
    const session = date?.availability.find((session) => {
      return session.timeSlot.start.getTime() === timeSlot.start.getTime()
        ? true
        : false;
    });

    // Return filtered rooms that match user's criteria, or empty array if none found
    return (
      session?.availableRooms.filter((room) => {
        return (
          // Check if room size matches any of the selected sizes, or if no sizes are selected
          (!filters.size.length ||
            filters.size.some((size) => size === room.size)) &&
          // Check if room has all of the selected equipment
          filters.equipment.every((equipment) =>
            room.equipment.includes(equipment)
          )
        );
      }) || []
    );
  };

  const dateListForDisplay = dateList.slice(
    dateRange.startIdx,
    dateRange.endIdx
  );

  return (
    <>
      {/* Show room selection modal when a time slot is clicked */}
      {showModal && (
        <RoomModal
          timeSlot={modalProps.current.timeSlot}
          roomList={modalProps.current.roomList}
          closeHandler={() => setShowModal(false)}
        />
      )}

      {/* Main table */}
      <div
        className="overflow-x-auto"
        role="grid"
        aria-label="Room availability calendar"
      >
        <table
          className="w-full text-xs min-w-max md:text-base"
          aria-label="Room availability schedule"
        >
          <caption className="sr-only">
            Room availability by date and time slot
          </caption>
          <thead>
            <tr className="h-12">
              <th scope="col"></th>
              <th scope="colgroup" colSpan={NO_OF_DAYS_SHOWN}>
                <div className="flex items-center">
                  {/* Previous page button */}
                  <div className="basis-1/12">
                    <button
                      className={
                        dateRange.startIdx
                          ? "focus:outline-none focus:ring focus:ring-blue-300 rounded p-1"
                          : "hidden"
                      }
                      onClick={() => prevPage()}
                      aria-label="Previous page of dates"
                      disabled={!dateRange.startIdx}
                    >
                      <i className="pi pi-angle-left" aria-hidden="true"></i>
                    </button>
                  </div>

                  {/* Title */}
                  <div className="text-sm font-normal text-gray-900 underline basis-10/12 md:text-xl">
                    Select A Time Slot
                  </div>
                  {/* Next page button */}
                  <div className="basis-1/12">
                    <button
                      className={
                        dateRange.endIdx === dateList.length
                          ? "hidden"
                          : "focus:outline-none focus:ring focus:ring-blue-300 rounded p-1"
                      }
                      onClick={() => nextPage()}
                      aria-label="Next page of dates"
                      disabled={dateRange.endIdx === dateList.length}
                    >
                      <i className="pi pi-angle-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </th>
            </tr>

            {/* Mobile date headers (show month and day only) */}
            <tr className="h-10 md:hidden">
              <th scope="col"></th>
              {dateListForDisplay.map((date) => {
                const formattedDate = date.toLocaleDateString("en-US", {
                  timeZone: "America/Toronto",
                  month: "short",
                  day: "2-digit",
                });
                return (
                  <th
                    scope="col"
                    key={date.toISOString()}
                    className="px-2 font-normal"
                  >
                    {formattedDate.split(" ")[0]}
                    <br />
                    {formattedDate.split(" ")[1]}
                  </th>
                );
              })}
            </tr>

            {/* Desktop date headers (show month, day and weekday) */}
            <tr className="h-10 max-md:hidden">
              <th scope="col"></th>
              {dateListForDisplay.map((date) => {
                return (
                  <th
                    scope="col"
                    className="px-2 font-normal"
                    key={date.toISOString()}
                  >
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

          {/* Time slots and availability grid */}
          <tbody>
            {timeSlotList.map((timeSlot, index) => {
              // Format time display
              const timeString = timeSlot.start.toLocaleTimeString("en-US", {
                timeZone: "America/Toronto",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              });
              const timeRangeString =
                timeString +
                " - " +
                timeSlot.end.toLocaleTimeString("en-US", {
                  timeZone: "America/Toronto",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                });

              return (
                <tr key={index} className="h-10">
                  {/* Mobile time display (start time only) */}
                  <th scope="row" className="w-10 pr-2 text-right md:hidden">
                    {timeString}
                  </th>
                  {/* Desktop time display (full time range) */}
                  <th
                    scope="row"
                    className="w-[8rem] pr-2 text-right max-md:hidden"
                  >
                    {timeRangeString}
                  </th>
                  {/* Availability cells for each date */}
                  {dateListForDisplay.map((date, idx) => {
                    // Combine date and time for this cell
                    const bookingTimeSlot = {
                      start: combineDateAndTime(date, timeSlot.start),
                      end: combineDateAndTime(date, timeSlot.end),
                    };

                    // Get available rooms for this time slot
                    const availableRooms = getAvailableRooms(bookingTimeSlot);
                    // Format date for accessibility label
                    const formattedDate = date.toLocaleDateString("en-US", {
                      timeZone: "America/Toronto",
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                    // Create accessible label for the cell
                    const cellLabel = `${availableRooms.length ? `${availableRooms.length} room${availableRooms.length !== 1 ? "s" : ""} available` : "No rooms available"} on ${formattedDate} at ${timeRangeString}`;

                    return (
                      <td
                        className={
                          "border-2 border-dotted border-gray-500 " +
                          (availableRooms.length
                            ? "bg-red-100 hover:cursor-pointer hover:bg-red-300 focus:outline-none focus:ring focus:ring-blue-300"
                            : "")
                        }
                        key={idx}
                        onClick={
                          availableRooms.length
                            ? () => {
                                // Set modal properties when cell is clicked
                                modalProps.current = {
                                  timeSlot: bookingTimeSlot,
                                  roomList: availableRooms,
                                  closeHandler: () => setShowModal(false),
                                };
                                setShowModal(true);
                              }
                            : undefined
                        }
                        aria-label={cellLabel}
                        role={availableRooms.length ? "button" : ""}
                        tabIndex={availableRooms.length ? 0 : -1}
                        onKeyDown={(e) => {
                          // Handle keyboard interactions for accessibility
                          if (
                            availableRooms.length &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            modalProps.current = {
                              timeSlot: bookingTimeSlot,
                              roomList: availableRooms,
                              closeHandler: () => setShowModal(false),
                            };
                            setShowModal(true);
                          }
                        }}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
