import React, { useRef } from "react";
import { RoomEquipmentProps } from "../../types/roomType";

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
    <form className="p-2 mb-4 border-2 border-gray-500 rounded-xl lg:w-full">
      <legend className="font-bold text-gray-700 text:base lg:text-xl">
        Equipment:
      </legend>
      <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700" />
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
