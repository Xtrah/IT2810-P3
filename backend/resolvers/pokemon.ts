import { Pokemon, PokemonAttributes } from '../models/pokemon';

const pokemonResolver = {
  // Return all pokemons
  pokemons: async () => {
    try {
      const pokemons = await Pokemon.find();
      return pokemons;
    } catch (err) {
      throw err;
    }
  },
  // Create a pokemon with certain attributes
  createPokemon: async (args: { pokemonInput: PokemonAttributes }) => {
    const { name, description } = args.pokemonInput;

    const pokemon = Pokemon.build({
      name,
      description,
    });

    try {
      const result = await pokemon.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default pokemonResolver;
