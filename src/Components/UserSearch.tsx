import React, { FC, useState } from 'react';
import AllUsers from '../db.json';
import axios from 'axios';

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

interface PropTypes {
  pokemon: {
    moves: [
      attack: {
        move: {
          name: string;
          url: string;
        };
      },
    ];
    sprites: {
      front_default: string;
    };
    id: number;
    name: string;
    weight: number;
  };
}

interface IStatePokeFetch {
  loading: boolean;
  error: boolean | string;
  setPokemon: () => void;
  pokemon: null | PropTypes;
  fetchPokemon: () => Promise<PropTypes>;
}

const usePokeFetch = () => {
  const [loading, setLoading] = useState<IStatePokeFetch['loading']>(false);
  const [error, setError] = useState<IStatePokeFetch['error'] | string>(false);
  const [pokemon, setPokemon] = useState<any>(null);

  async function fetchPokemon(pokemon: string) {
    if (loading) return;
    if (error) setError(false);
    setLoading(true);

    const pokeStringOrNumber = Number(pokemon) ? Number(pokemon) : pokemon;

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeStringOrNumber}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .then(() => setLoading(false));
  }

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
  };
};
