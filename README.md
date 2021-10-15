# Project 3

## Backend

### Scripts

`npm install` - install dependencies
`npm start` - starts server.
`npm run dev` - runs server using nodemon, automatically restarting server on file changes.

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
