import React, { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './styles.css';
import Spinner from './Spinner';
import PokemonCharacteristics from './PokemonCharacteristics';

interface Pokemon {
  moves: MoveProps[];
  sprites: {
    front_default: string;
  };
  id: number;
  name: string;
  weight: number;
}

interface MoveNames {
  attack: MoveProps;
  name: string;
  url: string;
}

interface MoveEffect {
  [index: number]: { effect: string };
}

interface MoveProps {
  effect_entries: MoveEffect;
  move: MoveNames;
}

interface IStatePokeFetch {
  loading: boolean;
  error: boolean | string;
  setPokemon: React.SetStateAction<ServerResponsePoke>;
  pokemon: null | Pokemon;
  fetchpokemon: () => Promise<ServerResponsePoke>;
}

interface ServerResponsePoke {
  data: Pokemon;
  err: {
    message: string;
    response: {
      status: number;
    };
  };
}

interface ServerResponseMoves {
  data: MoveProps;
  err: {
    message: string;
    response: {
      status: number;
    };
  };
}

const usePokeFetch = () => {
  const [loading, setLoading] = useState<IStatePokeFetch['loading']>(false);
  const [error, setError] = useState<IStatePokeFetch['error'] | false>(false);
  const [pokemon, setPokemon] = useState<ServerResponsePoke['data'] | null>(
    null,
  );
  const [currentMove, setCurrentMove] = useState<
    ServerResponseMoves['data'] | null
  >(null);

  async function fetchMove(moveURL: MoveProps['move']['url']) {
    if (loading) return;
    if (error) setError(false);
    setLoading(true);

    try {
      const response: ServerResponseMoves = await axios.get(`${moveURL}`);
      if (response.data) setCurrentMove(response.data);
    } catch (err) {
      const errors = err as AxiosError;
      setError(errors.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPokemon(pokemon: Pokemon['name']) {
    if (loading) return;
    if (error) setError(false);
    setLoading(true);

    const pokeStringOrNumber = Number(pokemon) ? Number(pokemon) : pokemon;

    try {
      const response: ServerResponsePoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeStringOrNumber}`,
      );
      if (response.data) setPokemon(response.data);
    } catch (err) {
      const errors = err as AxiosError;
      if (errors.response?.status === 404)
        setError(
          `We couldn't find any pokemon that match "${pokeStringOrNumber}" 😩`,
        );
      else setError(errors.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    fetchMove,
    currentMove,
  };
};

const PokeMove: FC<MoveProps['effect_entries'][0]> = ({
  effect,
}): JSX.Element => {
  return (
    <div className="mx-auto mt-4 p-4">
      <p className="text-center">{effect}</p>
    </div>
  );
};

const PokemonDetails: FC<Pokemon> = (props): JSX.Element => {
  const [selectedMove, setSelectedMove] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const { loading, error, currentMove, fetchMove } = usePokeFetch();

  const addSelectedMoveBackground = (
    targetDiv: HTMLDivElement | null,
  ): void => {
    const classesToAddRemove = ['bg-cyan-100', 'shadow-inner'];
    document
      .querySelectorAll('.move-container')
      .forEach(
        (node) =>
          node.classList.contains('bg-cyan-100') &&
          node.classList.remove(...classesToAddRemove),
      );
    targetDiv?.classList.add(...classesToAddRemove);
  };

  const onClickMoveHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    const defineE = e.target as Element;

    const targetURL = defineE.id;
    const targetMoveName = defineE.innerHTML;

    if (targetURL === selectedMove?.url) return;
    const targetDiv = defineE.closest('div');

    addSelectedMoveBackground(targetDiv);

    fetchMove(targetURL);
    setSelectedMove({ name: targetMoveName, url: targetURL });
  };

  return (
    <div className="flex flex-col space-between w-full md:flex-row mx-auto mb-6">
      <div className="mx-auto">
        <h1 className="text-center font-bold text-2xl uppercase">
          {props.name}
        </h1>
        <div className="mx-auto p-2 border border-1-gray400 rounded-lg shadow-md shadow-cyan-200/50 mt-4">
          <img
            src={props.sprites.front_default}
            alt={props.name}
            className="mx-auto hover:scale-150 ease-in-out duration-1000"
          />
          <div className="text-center">
            <span className="font-bold">Weight:</span>
            <span className="ml-1">{props.weight}</span>
          </div>
          <PokemonCharacteristics {...props} />
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:w-1/2">
        <h1 className="text-center font-bold text-2xl uppercase">
          {selectedMove?.name ? selectedMove.name : 'Move'}
        </h1>
        {error ? (
          <p className="p-2 text-xl text-center">{error}</p>
        ) : loading ? (
          <Spinner />
        ) : !currentMove ? null : (
          <PokeMove effect={currentMove.effect_entries[0].effect} />
        )}
        <div className="flex flex-wrap gap-4 p-4 mx-4">
          {props.moves.map((attack) => (
            <div
              key={attack.move.url.length + attack.move.url}
              className="move-container border cursor-pointer border-1-gray-200 rounded-lg shadow-md shadow-cyan-200/50 text-center hover:scale-110 ease-in-out duration-500">
              <p
                className="px-3 py-2"
                id={attack.move.url}
                onClick={(e) => onClickMoveHandler(e)}>
                {attack.move.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PokeForm: FC = (): JSX.Element => {
  const [pokemonName, setPokemonName] = useState<Pokemon['name']>('');
  const { pokemon, loading, error, fetchPokemon } = usePokeFetch();

  const searchPokemonHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (pokemonName === pokemon?.name) {
      setPokemonName('');
      return;
    }
    fetchPokemon(pokemonName);
    setPokemonName('');
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <form action="submit" onSubmit={searchPokemonHandler}>
          <div className="mx-auto">
            <h1 className="text-center text-3xl font-bold mt-6 mb-10">
              Search for your favorite Pokemon!
            </h1>
            <div className="p-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm  focus-within:border-cyan-600">
              <label
                htmlFor="pokemon"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium">
                Pokemon
              </label>
              <input
                type="text"
                value={pokemonName}
                placeholder="Enter pokemon name here..."
                onChange={(e) => setPokemonName(e.target.value)}
                className="block w-full border-0 px-0 py-2 focus:outline-0 focus:ring-0 sm:text-sm"
              />
            </div>
            <div>
              <button className="mb-4 mt-4 py-2 px-4 bg-cyan-600 border border-1-gray-200 hover:bg-cyan-800 rounded-xl text-white shadow-lg shadow-cyan-200/50">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {error ? (
        <p className="p-2 text-xl text-center">{error}</p>
      ) : loading ? (
        <Spinner />
      ) : !pokemon ? null : (
        <PokemonDetails {...pokemon} />
      )}
    </>
  );
};

export default PokeForm;
