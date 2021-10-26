import { pokemonFilterVar, PokemonFilter } from '../types/cache';

export const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};
