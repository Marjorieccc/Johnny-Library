import React, { useRef } from "react";
import { RoomCapacityProps } from "../../types/room";

export default function RoomCapacity({
  roomSize,
  onSelect,
}: RoomCapacityProps) {
  const sizeList = useRef<number[]>([]);

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // require casting for Types.ObjectId
      sizeList.current.push(+event.target.value);
    } else {
      sizeList.current = sizeList.current.filter(
        (item) => item !== +event.target.value
      );
    }
    onSelect(sizeList.current);
  };

  return (
    <form className="mb-4">
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2" />
      <legend className="text-gray-700 font-bold text-xl">Capcity</legend>
      {roomSize.map((size) => {
        return (
          <div key={size._id} className="my-2">
            <input
              id={size.capacity}
              type="checkbox"
              value={size._id}
              onChange={(event) => handler(event)}
            />
            <label className="pl-2" htmlFor={size.capacity}>
              {size.capacity}
            </label>
          </div>
        );
      })}
    </form>
  );
}
