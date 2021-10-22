import { ChakraProvider, Box } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import SearchPage from './pages/SearchPage';

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
          {/* TODO: Nav should contain navigation */}
          <Box p={2}>Nav</Box>
          <SearchPage />
        </ApolloProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
