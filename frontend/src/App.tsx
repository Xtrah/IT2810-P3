import { ChakraProvider, Box } from '@chakra-ui/react';
import SearchPage from './pages/SearchPage';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { cache } from './types/cache';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
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
