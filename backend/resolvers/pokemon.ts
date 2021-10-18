import { Pokemon, PokemonAttributes } from '../models/pokemon';

interface QueryOptions {
  name: { $regex: RegExp };
  types?: string;
}

const pokemonResolver = {
  /*
    Return all pokemons or query name or type.
    Sort alphabetically on name by default. Can sort descending.
  */
  pokemons: async (args: {
    name: string;
    sortDescending: boolean;
    type: string;
  }) => {
    try {
      /*
        Defining name query is optional.
        Query doesn't have to be exact as name.
        Query is case insensitive. 
      */
      const queryOptions: QueryOptions = {
        name: { $regex: new RegExp(args.name || '', 'i') },
      };
      // Query on type is optional
      if (args.type) {
        queryOptions.types = args.type.toLowerCase();
      }

      // Default sort is alphabetically. Can query descending.
      const sortOptions = { name: args.sortDescending ? -1 : 1 };
      const pokemons = await Pokemon.find(queryOptions)
        .sort(sortOptions)
        .exec();
      return pokemons;
    } catch (err) {
      throw err;
    }
  },
  // Create a pokemon with certain attributes
  createPokemon: async (args: { pokemonInput: PokemonAttributes }) => {
    const { name, description, types, height, weight, imageUrl } =
      args.pokemonInput;

    const pokemon = Pokemon.build({
      name,
      description,
      types,
      height,
      weight,
      imageUrl,
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
