interface Pokemon {
    id: string,
    name: string,
    types: Type[],
}

interface FilteredPokemon {
    id: string,
    name: string,
    types: string[],
}

interface Type{
    type: {
        name: string,
    }
}

interface Characteristics {
    description: string,
}

export const fetchPokemon = async () => {
    let pokemonData: FilteredPokemon[] = [];
    const amountOfPokemon = 5
    for (let pokemonId = 1; pokemonId <= amountOfPokemon; pokemonId++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then<Pokemon>((res) => res.json()).then(res => {
            // fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`).then<Characteristics>(res => res.json()).then(res => console.log(res))
            let pokemon = {
                id: res.id,
                name: res.name,
                types: res.types.map(type => type.type.name)
            }
            pokemonData.push(pokemon)
        });
    }
    console.log(pokemonData)
    return pokemonData;
  };