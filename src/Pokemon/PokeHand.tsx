import React, { FC, useEffect, useState } from 'react';
import { PokeDetailsProps, PokeHandArr } from './interfaces';

export const PokeCard = (pokemon: PokeDetailsProps['pokemon']) => {
  if (!pokemon) return null;
  const pokemonCumulativeScore = pokemon.stats
    .map((poke) => poke.base_stat)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="w-1/2 lg:w-1/4 border-1-gray500 border rounded-xl">
      <div className="mx-auto p-2 border border-1-gray400 rounded-lg shadow-md shadow-cyan-200/50">
        <h1 className="text-center font-bold text-2xl uppercase">
          {pokemon.name}
        </h1>
        <h1 className="text-center font-bold text-2xl uppercase text-red-600">
          {(pokemonCumulativeScore / pokemon.stats.length).toFixed(2)}
        </h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto hover:scale-150 ease-in-out duration-1000"
        />
      </div>
    </div>
  );
};

export const PokeHand = ({ pokemon }: PokeHandArr) => {
  const [pokeHandCumulative, setPokeHandCumulative] = useState<number | string>(
    0,
  );

  useEffect(() => {
    if (pokemon.length < 1) return;
    let pokemonCumulativeScore = 0;

    pokemon.forEach((poke) => {
      const eachPokemonCumulative =
        poke.stats
          .map((poke) => poke.base_stat)
          .reduce((acc, curr) => acc + curr, 0) / poke.stats.length;
      pokemonCumulativeScore += eachPokemonCumulative;
    });
    setPokeHandCumulative(pokemonCumulativeScore.toFixed(2));
  }, [pokemon]);
  if (pokemon.length < 1) return null;

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div className="flex-wrap flex justify-center items-center">
        {pokemon && pokemon.map((poke) => <PokeCard {...poke} />)}
      </div>
      <div className="flex justify-center items-center mt-2">
        <span className="text-bold text-2xl text-red-800">Hand Strength:</span>
        <span className="ml-2 text-bold text-2xl">{pokeHandCumulative}</span>
      </div>
    </div>
  );
};

export const ComputerPokeHand = ({ pokemon }: PokeHandArr) => {
  if (pokemon.length < 1) return null;
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div className="flex-wrap flex">
        {pokemon && pokemon.map((poke) => <PokeCard {...poke} />)}
      </div>
    </div>
  );
};
