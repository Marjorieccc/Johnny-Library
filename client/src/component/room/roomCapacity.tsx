import React, { useRef } from "react";
import { RoomCapacityProps } from "../../types/room";

export default function RoomCapacity({
  roomSize,
  onSelect,
}: RoomCapacityProps) {
  const sizeList = useRef<string[]>([]);

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      sizeList.current.push(event.target.value);
    } else {
      sizeList.current = sizeList.current.filter(
        (item) => item !== event.target.value,
      );
    }
    onSelect(sizeList.current);
  };

  return (
    <form className="mb-4 w-full rounded-xl border-2 border-gray-500 p-2">
      <legend className="text-base font-bold text-gray-700 lg:text-xl">
        Capcity
      </legend>
      <hr className="mb-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      {roomSize.map((size) => {
        return (
          <div key={size._id} className="my-2">
            <input
              id={size._id}
              type="checkbox"
              value={size._id}
              onChange={(event) => handler(event)}
            />
            <label className="pl-2 text-xs lg:text-base" htmlFor={size._id}>
              {size.capacity}
            </label>
          </div>
        );
      })}
    </form>
  );
}
