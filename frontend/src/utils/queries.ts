import { gql } from '@apollo/client';

// Get pokemon with all fields
export const GET_POKEMON = gql`
  query ($_id: String) {
    pokemon(_id: $_id) {
      _id
      name
      description
      types
      weight
      height
      imageUrl
    }
  }
`;

// Get pokemons with all fields
export const GET_POKEMONS = gql`
  query ($name: String, $sortDescending: Boolean, $type: String) {
    pokemons(name: $name, sortDescending: $sortDescending, type: $type) {
      _id
      name
      description
      types
      weight
      height
      imageUrl
    }
  }
`;

// Get pokemons with limited fields
export const GET_POKEMONS_LIMITED = gql`
  query GET_POKEMONS_BASIC(
    $name: String
    $sortDescending: Boolean
    $type: String
    $offset: Int
  ) {
    pokemons(
      name: $name
      sortDescending: $sortDescending
      type: $type
      offset: $offset
    ) {
      _id
      name
      description
      types
      imageUrl
    }
  }
`;

export const GET_POKEMON_FILTER = gql`
  query GetPokemonFilter {
    pokemonFilter @client {
      type
      sortDescending
    }
  }
`;
