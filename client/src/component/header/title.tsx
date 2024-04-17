import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <header className="flex">
        <button className="mx-2 text-xl lg:hidden pi pi-bars"></button>
          <h1 className="pt-1 text-base text-gray-900 no-underline lg:text-xl lg:ml-3 font-fjalla lg:mb-1 lg:text-md ">
            <Link to='/'>Johnny Library</Link>
          </h1>
    
    </header>
  );
}
