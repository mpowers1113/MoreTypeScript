import React, { FC, useEffect } from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

function fetchChars(name: any): Promise<void> {
  return axios.get(`https://pokeapi.co/api/v2/ability/${name}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}

const PokemonCharacteristics: FC = (props: any) => {
  console.log(props);

  const loopAbilities = props.abilities.map(
    (ability: { ability: { name: string } }) => ability.ability.name,
  );

  console.log(loopAbilities);

  const charQueries = useQueries(
    loopAbilities.map((ability: any) => {
      return {
        querykey: ['ability', ability],
        queryFn: () => fetchChars(ability),
      };
    }),
  );

  useEffect(() => {
    if (charQueries) console.log(charQueries);
  }, [charQueries]);

  return (
    <div className="mt-4 mx-auto">
      <p className="p-3">Characteristics</p>
      {charQueries.map((char) => {
        const { isLoading, isError, data, isFetching } = char;
        {
          isLoading && <p>Loading...</p>;
        }
        {
          isError && <p>An error occurred...</p>;
        }
        {
          isFetching && <p>Updating...</p>;
        }
      })}
    </div>
  );
};

export default PokemonCharacteristics;
