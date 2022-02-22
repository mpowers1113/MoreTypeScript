import React, { FC } from 'react';

interface ChildProps {
  color: string;
  onClick: () => void;
}

export const Child: FC<ChildProps> = ({ color, onClick }) => {
  return (
    <div>
      <h1>{color}</h1>
      <button
        onClick={onClick}
        className="px-5 py-2 bg-orange-100 hover:bg-amber-300 rounded-lg mt-4 shadow-red-300 shadow text-red-400">
        Click Me
      </button>
    </div>
  );
};
