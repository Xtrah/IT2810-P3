import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SearchPage from '../pages/SearchPage';

describe('<Home />', () => {
  it('search field reacts to user input', () => {
    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <ChakraProvider>
          <SearchPage />
        </ChakraProvider>
      </ApolloProvider>
    );

    const inputText = 'squirtle';
    const input = getByPlaceholderText(
      'Enter pokemon name'
    ) as HTMLInputElement;

    userEvent.type(input, inputText);

    expect(input.value).toBe(inputText);
  });
});
