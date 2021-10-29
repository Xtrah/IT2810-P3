import { ApolloProvider, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { cache } from './cache';
import Nav from './components/Nav';
import PokemonPage from './pages/PokemonPage';
import SearchPage from './pages/SearchPage';
import CreatePokemonPage from './pages/CreatePokemonPage';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://it2810-15.idi.ntnu.no:4000/graphql',
    cache,
  });

  return (
    <div>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Router>
            <Nav />
            <Switch>
              <Route path="/project3" exact>
                <SearchPage />
              </Route>
              <Route path="/project3/pokemon/:id">
                <PokemonPage />
              </Route>
              <Route path="/project3/create">
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
