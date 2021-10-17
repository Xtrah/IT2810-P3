interface APIPokemon {
  id: string;
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
  id: string;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  description: string;
}

export const fetchPokemon = async () => {
  let pokemonData: FilteredPokemon[] = [];
  const amountOfPokemon = 5;
  for (let pokemonId = 1; pokemonId <= amountOfPokemon; pokemonId++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then<APIPokemon>((res) => res.json())
      .then((res) => {
        let pokemon: FilteredPokemon = {
          id: res.id,
          name: res.name,
          image: res.sprites.front_default,
          height: res.height,
          weight: res.weight,
          types: res.types.map((type) => type.type.name),
          description: '',
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
