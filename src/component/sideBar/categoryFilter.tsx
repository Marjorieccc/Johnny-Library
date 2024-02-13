import React from "react";
import Input from "../ui/input";

export type HandleChangeProps = {
  category: string;
  itemList: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CategoryFilter({
  category,
  itemList,
  handleChange,
}: HandleChangeProps) {
  return (
    <fieldset className="collapse collapse-plus border hover:bg-purple-100 lg:hover:bg-transparent">
      <input type="checkbox" defaultChecked={true} />
      <div className="collapse-title text-xl font-medium">{category}</div>
      <div className="collapse-content">
        {itemList.map((item) => (
          <div className="pb-1 md:pb-0 text-base text-gray-900">
            <Input
              handleChange={handleChange}
              type="checkbox"
              name="item"
              value="item"
              title="item"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
