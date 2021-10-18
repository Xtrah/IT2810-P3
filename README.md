# Project 3

## Start the project

```
project3
├───backend
└───frontend
```

First start the backend.
`cd backend`
`npm run dev`

Then start the frontend.
`cd ..`
`cd frontend`
`npm run start`

## Frontend

`npm install` - install dependencies
`npm start` - start server in development mode
`npm build` - bundle code into build directory for production

### File structure

We wanted a file structure which supports maintainability and you can find functionality in files where you expect to find them. `components` contains components which have been extracted for easier read or are reused. `pages` contains components which are parents for a route. functions for the graphql- queries and -mutations. `types` contains the typescript typings. `utils` contains functions which are extracted for easier read or helper functions which are used multiple places. In `utils` we have the graphql strings we use to query and mutate data. `App.tsx` is the root component.

```
frontend
src
├───components
├───pages
├───types
├───utils
│   │   queries.ts
└───App.tsx
```

### GraphQL

For use of GraphQL on the client side we chose [Apollo client](https://www.apollographql.com/docs/react/why-apollo/). It's easy to get started as it's little setup. What's especially useful is the useQuery-hook they offer. It's intuitive sending in queries with variables, and the handling of errors and loading lets you use little code for a lot of functionality. It has great documentation and it's popular, making it easy to learn and use in smart ways. It also comes with cache. Queries after the initial query will first check the cache (unless the cache is customized). This makes queries very fast.

### Chakra UI

We chose a component library as it speeds up development giving good looking design fast. We chose [Chakra UI](https://chakra-ui.com/) for its built in accessibility. It's also easy to set up, uses prop so it's easy to customize and it's intuitive to use.

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
\_id
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
"\_id": "61696225bb286c8ea6f6f114",
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
\_id
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
"\_id": "61697b2e11edf8bc35808c47",
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
