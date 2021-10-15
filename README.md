# Project 3

## Backend

### Scripts

`npm install` - install dependencies
`npm start` - starts server.
`npm run dev` - runs server using nodemon, automatically restarting server on file changes.

### API

#### pokemons

Get all pokemons or query according to parameters.

```
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
```

Example variables: `{"name": "Squirtle", "sortDescending": true, "type": "water"}`
Example results:

```
{
  "data": {
    "pokemons": [
      {
        "_id": "61696225bb286c8ea6f6f114",
        "name": "Squirtle",
        "description": "Aquaaa",
        "types": [
          "water"
        ],
        "weight": 50,
        "height": 60,
        "imageUrl": "www.randomimageurl123123123123.no"
      }
    ]
  }
}
```

#### createPokemon

Add a pokemon to the database.

```
mutation ($name: String!, $description: String!, $types: [String!]!, $weight: Int!, $height: Int!, $imageUrl: String!) {
  createPokemon(pokemonInput: {name: $name, description: $description, types: $types, weight: $weight, height: $height, imageUrl: $imageUrl}) {
    _id
    name
    description
    types
    weight
    height
    imageUrl
  }
}
```

Example variables: `{"name": "Squirtle", "description": "Aqua", "types": ["water"], "weight": 50, "height": 60, "imageUrl": "www.randomimageurl123123123.no"}`
Example results:

```
{
  "data": {
    "createPokemon": {
      "_id": "61697b2e11edf8bc35808c47",
      "name": "Squirtle",
      "description": "Aqua",
      "types": [
        "water"
      ],
      "weight": 50,
      "height": 60,
      "imageUrl": "www.randomimageurl123123123.no"
    }
  }
}
```

### File structure

`models` contains database schemas. `resolvers` contains functions for the graphql- queries and -mutations. `schema` contains the graphql types for queries, mutations and items. `app.ts` exposes the `graphql`- endpoint. `index.ts` starts up the application, including connecting to the database.

```

backend
├───models
├───resolvers
├───schema
├───app.ts
└───index.ts

```

```

```
