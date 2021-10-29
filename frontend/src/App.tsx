import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PokemonPage from './pages/PokemonPage';
import Nav from './components/Nav';
import CreatePokemonPage from './pages/CreatePokemonPage';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // This defines a merge function for paginated results. See https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination
            // Merge depends on offset by default. Parameters are other dependencies.
            pokemons: offsetLimitPagination(['name']),
          },
        },
      },
    }),
  });

  return (
    <div>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Router>
            <Nav />
            <Switch>
              <Route path="/" exact>
                <SearchPage />
              </Route>
              <Route path="/pokemon/:id">
                <PokemonPage />
              </Route>
              <Route path="/create">
                <CreatePokemonPage />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
