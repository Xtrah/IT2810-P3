import { pokemonFilterVar, PokemonFilter } from '../types/cache';

const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};

export default setPokemonFilter;
