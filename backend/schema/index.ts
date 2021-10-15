import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Pokemon {
  _id: ID!
  name: String!
  description: String!
}

input PokemonInput {
  name: String!
  description: String!
}

type RootQuery {
  pokemons(name: String): [Pokemon!]!
}

type RootMutation {
  createPokemon(pokemonInput: PokemonInput): Pokemon
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

export default schema;
