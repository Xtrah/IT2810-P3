import { pokemonFilterVar, PokemonFilter } from '../cache';

const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};

export default setPokemonFilter;
