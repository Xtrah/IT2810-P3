import { pokemonFilterVar, PokemonFilter } from "../cache";

export const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};
