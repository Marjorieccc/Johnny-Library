import React from "react";
import { Link } from "react-router-dom";
import { RoomModalProps } from "../../types/roomType";

export default function RoomModal(props: RoomModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-2/5 max-w-lg p-5 overflow-auto bg-white max-h-96 min-w-max">
        <div
          className="absolute cursor-pointer pi pi-times right-2 top-2"
          onClick={props.closeHandler ? props.closeHandler : undefined}
        ></div>
        <div className="flex justify-between w-full px-2">
          <div>
            {"Date: " +
              props.timeSlot.start.toLocaleDateString("en-US", {
                timeZone: "America/Toronto",
                month: "short",
                day: "2-digit",
              })}
          </div>
          <div>
            {"Time Slot: " +
              props.timeSlot.start.toLocaleTimeString("en-US", {
                timeZone: "America/Toronto",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              }) +
              " - " +
              props.timeSlot.end.toLocaleTimeString("en-US", {
                timeZone: "America/Toronto",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
          </div>
        </div>
        <ul className="mx-auto">
          {props.roomList.map((room, index) => (
            <li key={index}>
              <Link to={`/services/rooms/${room._id}`} state={{timeSlot: props.timeSlot, room: room}}>
                <div className="flex gap-2 p-2 my-2 border-2 border-gray-200 rounded-xl hover:border-gray-500">
                  <img src={room.image} className="max-w-32 rounded-xl" />
                  <div>
                    <p>Room: {room.name}</p>
                    <p>{room.desc}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
