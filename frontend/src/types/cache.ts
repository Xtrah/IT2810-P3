import { InMemoryCache, makeVar } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

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

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonFilter: {
          read() {
            return pokemonFilterVar();
          },
        },
        // This defines a merge function for paginated results. See https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination
        // Merge depends on offset and limit by default. Parameters are other dependencies.
        pokemons: offsetLimitPagination(['name', 'type', 'sortDescending']),
      },
    },
  },
});
