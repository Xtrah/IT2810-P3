import express from 'express';
import rootResolver from './resolvers';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

export { app };
