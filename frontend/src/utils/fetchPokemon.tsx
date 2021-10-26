interface APIPokemon {
  name: string;
  height: number;
  weight: number;
  types: Type[];
  sprites: Sprites;
}

interface Sprites {
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

export const fetchPokemon = async () => {
  let pokemonData: FilteredPokemon[] = [];
  const fromPokemon = 1;
  const lastPokemon = 151;
  for (let pokemonId = fromPokemon; pokemonId <= lastPokemon; pokemonId++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then<APIPokemon>((res) => res.json())
      .then((res) => {
        let pokemon: FilteredPokemon = {
          name: res.name,
          types: res.types.map((type) => type.type.name),
          description: '',
          height: res.height,
          weight: res.weight,
          imageUrl: res.sprites.front_default,
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
