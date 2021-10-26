import { InMemoryCache, makeVar } from '@apollo/client';

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

/**
 * PokemonFilterVar handles the filter variables.
 *
 * It allows for saving and retireval of filter states in the cache.
 */
export const pokemonFilterVar = makeVar<PokemonFilter>({
  type: '',
  sortDescending: false,
});

// Here we set the initial values for the filter.
