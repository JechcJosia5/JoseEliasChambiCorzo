import { fetchFromApi } from './api';

export interface PokemonSprites {
  [key: string]: string | null;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  weight: number;
}

export function fetchPokemon(nameOrId: string) {
  return fetchFromApi<PokemonResponse>('pokemon', nameOrId);
}
