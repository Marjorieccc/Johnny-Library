import React from "react";
import { Link } from "react-router-dom";
import { RoomModalProps } from "../../types/room";

export default function RoomModal(props: RoomModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-96 w-2/5 min-w-max max-w-lg overflow-auto bg-white p-5">
        <div
          className="pi pi-times absolute right-2 top-2 cursor-pointer"
          onClick={props.closeHandler ? props.closeHandler : undefined}
        ></div>
        <div className="flex w-full justify-between px-2">
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
                <div className="my-2 flex rounded-xl border-2 border-gray-200 p-2 gap-2 hover:border-gray-500">
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
