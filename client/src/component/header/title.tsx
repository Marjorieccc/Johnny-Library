import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <header>
    <div className="flex-initial">
        <h1 className="font-fjalla text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl">
          <Link to='/'>Johnny Library</Link>
        </h1>
    </div>
    </header>
  );
}
