import React from 'react'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    value: string;
    title: string;
  };

export default function Input({ handleChange, type, name, value, title }: Props) {
  return (
    <label>
        <input onChange={handleChange} type={type} name={name} value={value}/>
        {title}
    </label>
  )
}
