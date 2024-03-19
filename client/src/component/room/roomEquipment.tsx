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
    <form className="mb-4">
      <hr className="mb-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      <legend className="text-xl font-bold text-gray-700">Equipment: </legend>
      {equipmentCategory.map((category, index) => {
        return (
          <div key={index} className="my-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={(event) => handler(event)}
            />
            <label className="pl-2" htmlFor={category}>
              {category}
            </label>
          </div>
        );
      })}
    </form>
  );
}
