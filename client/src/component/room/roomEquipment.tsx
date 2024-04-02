import React, { useRef } from "react";
import { RoomEquipmentProps } from "../../types/room";

export default function RoomEquipment({
  equipmentCategory,
  onSelect,
}: RoomEquipmentProps) {
  const equipmentList = useRef<string[]>([]);

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      equipmentList.current.push(event.target.value);
    } else {
      equipmentList.current = equipmentList.current.filter(
        (item) => item !== event.target.value,
      );
    }
    onSelect(equipmentList.current);
  };

  return (
    <form className="mb-4 rounded-xl border-2 border-gray-500 p-2 lg:w-full">
      <legend className="text:base font-bold text-gray-700 lg:text-xl">
        Equipment:
      </legend>
      <hr className="mb-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      {equipmentCategory.map((category, index) => {
        return (
          <div key={index} className="my-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={(event) => handler(event)}
            />
            <label className="pl-2 text-xs lg:text-base" htmlFor={category}>
              {category}
            </label>
          </div>
        );
      })}
    </form>
  );
}
