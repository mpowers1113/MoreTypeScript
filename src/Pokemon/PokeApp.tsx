import React, { FC, useState } from 'react';
import { PokeHandArr } from './interfaces';
import { PokeHand, ComputerPokeHand } from './PokeHand';
import PokeForm from './PokeForm';
import { Pokemon, PokeHandState } from './interfaces/index';

export const PokeApp = () => {
  const [currentPokeHand, setCurrentPokeHand] = useState<
    PokeHandArr['pokemon'] | []
  >([]);

  return (
    <>
      <PokeHand pokemon={currentPokeHand} />
      {/* <ComputerPokeHand pokemon={currentPokeHand} /> */}
      <PokeForm
        setCurrentPokeHand={setCurrentPokeHand}
        currentPokeHand={currentPokeHand}
      />
    </>
  );
};
