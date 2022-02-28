export interface Pokemon {
  moves: MoveProps[];
  sprites: {
    front_default: string;
  };
  id: number;
  name: string;
  weight: number;
  abilities: PokemonCharProps['abilities'];
  types: PokemonCharProps['type'];
}

export interface PokeDetailsProps {
  pokemon: Pokemon;
  submitPokemonHandler: (name: string) => void;
}
export interface MoveNames {
  attack: MoveProps;
  name: string;
  url: string;
}

export interface MoveEffect {
  [index: number]: { effect: string };
}

export interface MoveProps {
  effect_entries: MoveEffect;
  move: MoveNames;
}

export interface IStatePokeFetch {
  loading: boolean;
  error: boolean | string;
  setPokemon: React.SetStateAction<ServerResponsePoke>;
  pokemon: null | Pokemon;
  fetchpokemon: () => Promise<ServerResponsePoke>;
}

export interface ServerResponsePoke {
  data: Pokemon;
  err: {
    message: string;
    response: {
      status: number;
    };
  };
}

export interface ServerResponseMoves {
  data: MoveProps;
  err: {
    message: string;
    response: {
      status: number;
    };
  };
}

export interface PokeTypes {
  type: {
    name: string;
    url: string;
  };
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  viewPokeSelected: boolean;
  submitPokemonHandler: (name: string) => void;
}

export interface PokemonEffectProps {
  ability: string;
}

export interface PokemonCharProps {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  type: PokeTypes[];
  submitPokemonHandler: (name: string) => void;
}

export interface DataReturn {
  ability: CharEntries;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

export interface CharEntries {
  effect_entries: EffectEntries[];
  pokemon: SimilarPokemon[];
}

export interface SimilarPokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

export interface EffectEntries {
  effect: string;
  language: { name: string; url: string };
}