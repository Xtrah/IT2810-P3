import express from 'express';
import rootResolver from './resolvers';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

export { app };
