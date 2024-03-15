import React, { useRef } from "react";
import { RoomEquipmentProps } from "../../types/room";

export default function RoomEquipment ({ equipmentCategory, onSelect }: RoomEquipmentProps) {
  const equipmentList = useRef<string[]>([]);

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      equipmentList.current.push(event.target.value);
    } else {
      equipmentList.current = equipmentList.current.filter(item => item !== event.target.value);
    }
    onSelect(equipmentList.current);
  }

  return (
    <form className="mb-4">
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2" />
      <legend className="text-gray-700 font-bold text-xl">Equipment: </legend>
      {equipmentCategory.map((category, index) => {
        return (
          <div key={index} className="my-2">
            <input type="checkbox" id={category} value={category} onChange={event => handler(event)}/>
            <label className="pl-2" htmlFor={category}>{category}</label>
          </div>
        );
      })}
    </form>
  );
}