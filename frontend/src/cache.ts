import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonFilter: {
          read() {
            return pokemonFilterVar();
          },
        },
      },
    },
  },
});

export interface PokemonFilter {
  type: string;
  sortDescending: boolean;
}

export const pokemonFilterVar = makeVar<PokemonFilter>({
  type: "",
  sortDescending: false,
});
