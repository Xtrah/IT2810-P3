import { Pokemon, PokemonAttributes } from '../models/pokemon';

const pokemonResolver = {
  // Return all pokemons or query on name
  pokemons: async (args: { name: string }) => {
    try {
      /*
        Defining name query is optional.
        Query doesn't have to be exact as name.
        Query is case insensitive. 
      */
      const queryOptions = {
        name: { $regex: new RegExp(args.name || '', 'i') },
      };
      const pokemons = await Pokemon.find(queryOptions);
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
