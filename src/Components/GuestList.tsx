import React, { FC } from 'react';
import { useState } from 'react';

export const GuestList: FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const addGuestHandler = () => {
    setGuests([...guests, name]);
    setName('');
  };

  return (
    <div className="border border-cyan-400 rounded-2xl mx-3.5 border-1 flex-col justify-center items-center p-5 text-center">
      <div>
        <h1 className="text-xl mb-1 font-bold">Hello this is the guest list</h1>
        {guests.map((guest) => (
          <div key={guest}>
            <p>{guest}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="mt-2 p-4 mb-4 border-4 rounded-2xl"
        />
      </div>
      <div>
        <button
          onClick={addGuestHandler}
          className="py-3 px-5 bg-cyan-100 rounded-xl text-cyan-400">
          Add Guest
        </button>
      </div>
    </div>
  );
};
