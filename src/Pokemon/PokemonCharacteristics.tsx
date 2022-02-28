import React, { FC, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

import * as Interface from './interfaces';

const useCharFetch = () => {
  const [resultData, setResultData] = useState<
    Interface.DataReturn['ability'] | boolean
  >(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [similarError, setSimilarError] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarData, setSimilarData] = useState<
    Interface.DataReturn['ability'] | boolean
  >(false);

  async function fetchSimilar(url: string): Promise<void> {
    if (similarLoading) return;
    setSimilarLoading(true);
    if (similarError) setSimilarError(false);

    try {
      const res = await axios.get(`${url}`);
      if (res) setSimilarData(res.data);
    } catch (err) {
      const errors = err as AxiosError;
      if (errors) setSimilarError(true);
    } finally {
      setSimilarLoading(false);
    }
  }

  async function fetchChars(char: string): Promise<void> {
    if (isLoading) return;
    setIsLoading(true);
    if (isError) setIsError(false);

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/ability/${char}`);
      if (res) setResultData(res.data);
    } catch (err) {
      const errors = err as AxiosError;
      if (errors) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    resultData,
    isLoading,
    isError,
    fetchChars,
    similarData,
    similarError,
    fetchSimilar,
    similarLoading,
  };
};

const PokemonEffects: FC<Interface.PokemonEffectProps> = ({
  ability,
}): JSX.Element => {
  const { resultData, isLoading, isError, fetchChars } = useCharFetch();
  console.log(resultData);
  useEffect(() => {
    fetchChars(ability);
  }, []);

  return (
    <>
      <p className="p-2 font-bold">{ability}</p>
      {isLoading && <p className="p-2">Loading...</p>}
      {isError && <p className="p-2">Error...</p>}
      {typeof resultData === 'object' &&
        resultData.effect_entries.map((entry) => {
          if (entry.language.name === 'en') {
            return <p className="p-2">{entry.effect}</p>;
          }
        })}
    </>
  );
};

const PokeTypeButton: FC<Interface.PokeTypes> = ({
  type,
  onClick,
  viewPokeSelected,
  submitPokemonHandler,
}): JSX.Element => {
  const { similarError, similarData, similarLoading, fetchSimilar } =
    useCharFetch();

  const onClickTypeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const defineE = e.target as Element;
    e.preventDefault();
    fetchSimilar(defineE.id);
    onClick(!viewPokeSelected);
  };

  return (
    <>
      <div className="mx-auto">
        {!viewPokeSelected && (
          <button
            onClick={onClickTypeHandler}
            id={type.url}
            className="m-2 py-1 px-2 bg-cyan-600 border border-1-gray-200 hover:bg-cyan-800 rounded-xl text-white shadow-lg shadow-cyan-200/50">
            {type.name}
          </button>
        )}
      </div>
      {viewPokeSelected && (
        <div className="mx-auto mt-4">
          {similarLoading && <p className="p-2">Loading...</p>}
          {similarError && <p className="p-2">Error...</p>}
          <div className="mx-auto">
            {typeof similarData === 'object' &&
              similarData.pokemon.map((poke: Interface.SimilarPokemon) => (
                <button
                  onClick={() => submitPokemonHandler(poke.pokemon.name)}
                  className="px-3 py-2 m-2 border-1-gray-200 rounded-lg shadow-md shadow-cyan-200/50 text-center hover:bg-cyan-200/50 ease-in-out duration-500"
                  key={poke.pokemon.url}
                  id={poke.pokemon.url}>
                  {poke.pokemon.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

const PokemonCharacteristics: FC<Interface.PokemonCharProps> = ({
  abilities,
  type,
  submitPokemonHandler,
}) => {
  const [viewPokeSelected, setViewPokeSelected] = useState(false);
  console.log(type, 'type from characteristics');

  const loopAbilities = abilities.map(
    (abilities: { ability: { name: string } }) => abilities.ability.name,
  );

  return (
    <div className="mt-4 mx-auto">
      {viewPokeSelected && (
        <button
          onClick={() => setViewPokeSelected(!viewPokeSelected)}
          className="m-2 py-1 px-2 bg-red-600 border border-1-gray-200 hover:bg-red-800 rounded-xl text-white shadow-lg shadow-red-200/50">
          Close
        </button>
      )}

      <div className="flex justify-around items-center">
        {type.map((each: Interface.PokeTypes) => (
          <div className="inline-flex justify-center items-center">
            {!viewPokeSelected && <span>View other</span>}
            <PokeTypeButton
              submitPokemonHandler={submitPokemonHandler}
              onClick={setViewPokeSelected}
              viewPokeSelected={viewPokeSelected}
              type={each.type}
            />
            {!viewPokeSelected && <span>pokemon</span>}
          </div>
        ))}
      </div>

      <div className="mx-auto text-center">
        {loopAbilities.map((name: string) => (
          <PokemonEffects key={name} ability={name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCharacteristics;
