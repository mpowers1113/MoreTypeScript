import React, { FC } from 'react';
import AllUsers from '../db.json';

console.log(AllUsers);

export const UserSearch: FC = () => {
  return (
    <div className="p-4 flex flex-row justify-center items-center text-center border border-red-100 w-3/6">
      <div>
        <input type="text" className="p-3" placeholder="Search..." />
      </div>
    </div>
  );
};
