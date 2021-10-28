interface APIPokemon {
  name: string;
  height: number;
  weight: number;
  types: Type[];
  sprites: Sprites;
}

interface Sprites {
  // eslint-disable-next-line camelcase
  front_default: string;
}

interface Type {
  type: {
    name: string;
  };
}

interface APICharacteristics {
  descriptions: Description[];
}

interface Description {
  description: string;
}

interface FilteredPokemon {
  name: string;
  height: number;
  weight: number;
  types: string[];
  description: string;
  imageUrl: string;
}

/**
 * Fetch pokemon from pokeapi.co in given interval
 * @returns array with all pokemon with name, types, description, height, weight and imageUrl
 */
const fetchPokemon = async () => {
  const pokemonData: FilteredPokemon[] = [];
  const fromPokemon = 1;
  const lastPokemon = 151;
  for (let pokemonId = fromPokemon; pokemonId <= lastPokemon; pokemonId += 1) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then<APIPokemon>((res) => res.json())
      .then((pokemonRes) => {
        const pokemon: FilteredPokemon = {
          name: pokemonRes.name,
          types: pokemonRes.types.map((type) => type.type.name),
          description: '',
          height: pokemonRes.height,
          weight: pokemonRes.weight,
          imageUrl: pokemonRes.sprites.front_default,
        };
        fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`)
          .then<APICharacteristics>((res) => res.json())
          .then((res) => {
            // Third element of descriptions is english description
            pokemon.description = res.descriptions[2].description;
          });
        pokemonData.push(pokemon);
      });
  }
  return pokemonData;
};

export default fetchPokemon;
