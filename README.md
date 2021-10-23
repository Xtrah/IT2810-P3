# Project 3

[![pipeline status](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3/badges/master/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3/-/commits/master)

## 👩‍💻 Start the project

```
project3
├───backend
└───frontend
```

First start the backend.

```
cd backend
npm run dev
```

Then start the frontend.

```
cd ..
cd frontend
npm run start
```

## 🏙 Frontend

### Scripts

- `cd frontend` to go to frontend directory
- `npm install` to install dependencies
- `npm start` to run app in development mode
- `npm run lint` to run prettier and eslint checks
- `npm build` to minify and build for production to the `build` folder

#### Run frontend tests

While in frontend directory:

- `npm test` to run tests
- `npm run cy:run` to run cypress tests (headlessly)
- `npm run cy:open` to run cypress tests (with GUI)

Cypress tests assume you have backend and frontend running.

### Frontend file structure

We wanted a file structure which supports maintainability and you can find functionality in files where you expect to find them. `components` contains components which have been extracted for easier read or are reused. `pages` contains components which are parents for a route. functions for the graphql- queries and -mutations. `types` contains the typescript typings. `utils` contains functions which are extracted for easier read or helper functions which are used multiple places. In `utils` we have the graphql strings we use to query and mutate data. `App.tsx` is the root component. As for tests, cypress tests are in `/cypress` while the other tests are in `src/__tests__`.

```
cypress
src
├───__tests__
├───components
├───pages
├───types
├───utils
│   │   queries.ts
└───App.tsx
```

### GraphQL

For use of GraphQL on the client side we chose [Apollo client](https://www.apollographql.com/docs/react/why-apollo/). It's little setup, and what's especially useful is the useQuery-hook they offer. It's intuitive sending in queries with variables, and the handling of errors and loading lets you use little code for a lot of functionality. It has great documentation and it's popular, making it easy to learn and use in smart ways. It also comes with cache, which can make queries very fast. By default, the queries check the queries first, then the network.

For pagination we [configured the cache](https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination), merging incoming data according to our key arguments. We also used the `fetchMore`-function from `useQuery` to call more items.

There are many [different pagination strategies](https://www.apollographql.com/docs/react/pagination/overview/) a server can use. We thought offset was intuitive to use with mongodb and [suitable for this project](https://piazza.com/class/ksk8rtnewz56sh?cid=154), even though it can be less effective in [huge datasets](https://stackoverflow.com/questions/55744926/offset-pagination-vs-cursor-pagination).

### Chakra UI

We wanted a component library as it speeds up development giving good looking design fast. We chose [Chakra UI](https://chakra-ui.com/) for its built in accessibility. It's also easy to set up, uses props so it's easy to customize and it's intuitive to use.

### 🧪 Tests using Jest and Cypress

We have tested the application in multiple ways. Using [Jest](https://jestjs.io/) as a test runner, we tested utility functions using input and expected output. We made a simple render test for app using [testing-library](https://testing-library.com/docs/react-testing-library/intro/). With this we also tested user interaction on input. For test of displaying of data we used snapshot test, using [renderer](https://reactjs.org/docs/test-renderer.html).

We have used [Cypress](https://docs.cypress.io/) for end to end tests. These tests mimic user interaction, but are slower than unit and integration tests. We have tested the search input and the results, checking for input and expecting correct results.

## 🌆 Backend

### Scripts

- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npm run lint` to run prettier and eslint checks

### API

#### pokemons

Get all pokemons or query according to parameters.

```

query ($name: String, $sortDescending: Boolean, $type: String, $offset: Int) {
pokemons(name: $name, sortDescending: $sortDescending, type: $type, offset: $offset) {
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

Example variables: `{"name": "Squirtle", "sortDescending": true, "type": "water", "offset": 50}`
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

### Backend file structure

`models` contains database schemas. `resolvers` contains functions for the graphql- queries and -mutations. `schema` contains the graphql types for queries, mutations and items. `app.ts` exposes the `graphql`- endpoint. `index.ts` starts up the application, including connecting to the database.

```
backend
├───models
├───resolvers
├───schema
├───app.ts
└───index.ts
```

## ⚗️ Code quality and use of Git

We made use of the formatting tools [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to ensure a common coding style and good code quality. These were enforced with a pipeline/GitLab CI on pull request and after merge. We also ran tests in the pipeline to make sure functionality was as expected.

We had an early meeting planning each project requirement decomposing them into functional user stories or technical user stories. All user stories were submitted as issues in GitLab, such that commits can be linked.

During development, we strived to follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

- [Overview of different commit types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [Rules for commit messages](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
