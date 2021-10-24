import { gql } from '@apollo/client';

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
