import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      navigate('/explore', { state: { searchTerm: inputRef.current.value } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow relative">
      <input type="text" ref={inputRef} placeholder="Search"
        className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-neutral-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"
      />
      <div className="absolute search-icon" style={{ top: '0.375rem', left: '1rem' }}>
        <svg className="fill-current pointer-events-none text-gray-800 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </div>
  </form>
  );
}
