import React from "react";
import Input from "../ui/input";

export type HandleChangeProps = {
  category:string,
  itemList: Promise<string[]>,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CategoryFilter({ category, itemList, handleChange }: HandleChangeProps) {
  return (
    <fieldset className="collapse collapse-plus border hover:bg-purple-100 lg:hover:bg-transparent">
      <input type="checkbox" defaultChecked={true}/>
      <div className="collapse-title text-xl font-medium">Category</div>
      <div className="collapse-content">
        <div className="pb-1 md:pb-0 text-base text-gray-900">
          <Input
            handleChange={handleChange}
            type="checkbox"
            name="Fiction"
            value="Fiction"
            title="Fiction"
          />
          <div className="pb-1 md:pb-0 text-base text-gray-900">
            <Input
              handleChange={handleChange}
              type="checkbox"
              name="Fiction"
              value="Fiction"
              title="Fiction"
            />
          </div>
          <div className="pb-1 md:pb-0 text-base text-gray-900">
            <Input
              handleChange={handleChange}
              type="checkbox"
              name="Fiction"
              value="Fiction"
              title="Fiction"
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
