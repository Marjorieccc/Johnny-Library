import React from "react";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  value: string;
  title: string;
};

export default function Input({
  handleChange,
  type,
  name,
  value,
  title,
}: Props) {
  return (
    <label className="flex gap-2">
      <input
        onChange={handleChange}
        type={type}
        name={name}
        value={value}
        className="apperance-none mt-1 h-4 w-4 shrink-0 rounded-sm"
      />
      {title}
    </label>
  );
}
