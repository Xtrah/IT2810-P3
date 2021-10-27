import { ApolloProvider, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { cache } from './types/cache';
import Nav from './components/Nav';
import PokemonPage from './pages/PokemonPage';
import SearchPage from './pages/SearchPage';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
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
            </Switch>
          </Router>
        </ApolloProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
