# Project 3

[![pipeline status](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3/badges/master/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3/-/commits/master)

## 👩‍💻 Development

```
project3
├───backend
└───frontend
```

First start the backend.

```
cd backend
npm install
npm run dev
```

Then start the frontend in another terminal.

```
cd ..
cd frontend
npm install
npm start
```

### 🏙 Frontend

- `cd frontend` to go to frontend directory
- `npm install` to install dependencies
- `npm start` to run app in development mode
- `npm run lint` to run prettier and eslint checks
- `npm build` to minify and build for production to the `build` folder
- `npm test` to run tests
- `npm run cy:run` to run Cypress tests (headlessly)
- `npm run cy:open` to run Cypress tests (with GUI)

Cypress tests assume you have backend and frontend running.

#### Frontend file structure

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

Our goal was a file structure which supports maintainability and where you can find functionality exactly where you expect to find it.

- `components` contains components which have been extracted for easier read or are reused.
- `pages` contains components which are parents for a route. functions for the graphql- queries and -mutations.
- `types` contains the typescript typings.
- `utils` contains functions which are extracted for easier read or helper functions which are used multiple places. In `utils` we have the graphql strings we use to query and mutate data.
- `App.tsx` is the root component. As for tests, cypress tests are in `/cypress` while the other tests are in `src/__tests__`.

### 🌆 Backend

- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npm run lint` to run prettier and eslint checks

#### Backend file structure

```
backend
├───models
├───resolvers
├───schema
├───app.ts
└───index.ts
```

- `models` contains database schemas.
- `resolvers` contains functions for the graphql- queries and -mutations.
- `schema` contains the graphql types for queries, mutations and items.
- `app.ts` exposes the `graphql`-endpoint.
- `index.ts` starts up the application, including connecting to the database.

## Feature requirements

### 🔎 Search

A user can search for pokemon on SearchPage. On the client, useQuery is called on input. It will query cache first, then check network. On the backend, a query on name is run on the database, returning a list of the results.

### 📜 Search result pagination

For pagination we [configured the cache](https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination), merging incoming data according to our key arguments. We also used the `fetchMore`-function from `useQuery` to call more items.

There are many [different pagination strategies](https://www.apollographql.com/docs/react/pagination/overview/) a server can use. We thought offset was intuitive to use with mongodb and [suitable for this project](https://piazza.com/class/ksk8rtnewz56sh?cid=154), even though it can be less effective in [huge datasets](https://stackoverflow.com/questions/55744926/offset-pagination-vs-cursor-pagination).

### 📑 Detail view of objects

From search results, one can click into details of a pokemon. This does a new query encompassing more fields of the object. Detail view can be done in a multiple ways. We chose to do a new query in detail page instead of filtering on the client. This entailed making another endpoint for fetching a single pokemon by id. We found this suitable, as it allows a user to access a detail page without having first enter the main page.

### 🗃 Sorting and filtering search

<!-- TODO -->

### ⌨ User generated data

<!-- TODO  -->

### 💁‍♀️ Accessibility

<!-- TODO: Write about other accessibility concerns -->

#### 📚 Chakra UI

We wanted a component library as it speeds up development giving good looking design fast. We chose [Chakra UI](https://chakra-ui.com/) for its built in accessibility. It's also easy to set up, uses props so it's easy to customize and intuitive to use.

## Tech requirements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### ⚖ State management using Redux

<!-- TODO -->

### 💾 Database

#### MongoDB

[MongoDB](https://www.mongodb.com/why-use-mongodb) is a document database. Document databases uses a JSON-like format to store objects, similar to native objects in objects in Javascript, making it intuitive to use. Working with mongodb, there are [multiple choices](https://www.mongodb.com/developer/article/mongoose-versus-nodejs-driver/). Either speaking to the database directly or using libraries such as [mongoose](https://mongoosejs.com/docs/) on top. To communicate with mongodb, we chose [mongoose](https://mongoosejs.com/docs/). We chose mongoose, as it adds an [abstraction](https://stackoverflow.com/questions/18531696/why-do-we-need-what-advantages-to-use-mongoose). Schemas help structure data, and models can be easier to work with than pure data.

#### GraphQL

We used [GraphQL](https://graphql.org/) in the backend. We defined resolvers using GraphQL-schemas to define what was expected input and output. The resolvers also interacted with mongodb through mongoose accordingly. The backend also had to expose endpoint, so the client could communicate with the backend. We used [Express](https://expressjs.com/) on a [node](https://nodejs.org/en/) server. We used express, as it simplifies multiple node functions, writing less code for [more functionality](https://www.geeksforgeeks.org/node-js-vs-express-js/).

On the client side, we used [Apollo client](https://www.apollographql.com/docs/react/why-apollo/) to communicate with GraphQL. It's little setup, and what's especially useful is the useQuery-hook they offer. It's intuitive sending in queries with variables, and the handling of errors and loading lets you use little code for a lot of functionality. It has great documentation and it's popular, making it easy to learn and use in smart ways. It also comes with cache, which can make queries very fast. By default, the queries check the queries first, then the network.

### 🧪 Tests using Jest and Cypress

We have tested the application in multiple ways. Using [Jest](https://jestjs.io/) as a test runner, we tested utility functions using input and expected output. We made a simple render test for app using [testing-library](https://testing-library.com/docs/react-testing-library/intro/). With this we also tested user interaction on input. For test of displaying of data we used snapshot test, using [renderer](https://reactjs.org/docs/test-renderer.html).

We have used [Cypress](https://docs.cypress.io/) for end to end tests. These tests mimic user interaction, but are slower than unit and integration tests. We have tested the search input and the results, checking for input and expecting correct results.

### ⚗️ Code quality and Git

We made use of the formatting tools [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to ensure a common coding style and good code quality. These were enforced with a pipeline/GitLab CI on pull request and after merge. We also ran tests in the pipeline to make sure functionality was as expected.

We had an early meeting planning each project requirement decomposing them into functional user stories or technical user stories. All user stories were submitted as issues in GitLab, such that commits can be linked.

During development, we strived to follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

- [Overview of different commit types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [Rules for commit messages](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
