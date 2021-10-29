import { pokemonFilterVar } from '../cache';
import PokemonFilter from '../types/pokemonFilter';

const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};

export default setPokemonFilter;
