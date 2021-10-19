import { ChakraProvider } from '@chakra-ui/react';
import renderer from 'react-test-renderer';
import PokemonCard from '../components/PokemonCard';
import { PokemonLimited } from '../types/pokemon';

// Inspired by https://blog.openreplay.com/react-snapshot-testing-with-jest-an-introduction-with-examples

describe('<PokemonCard />', () => {
  it('should match snapshot with data', () => {
    const pokemonData: PokemonLimited = {
      _id: 'randomid',
      name: 'Charizard',
      description: 'Fireeee',
      types: ['fire'],
      imageUrl: 'https://somerandomurl123123123.no',
    };

    const elem = renderer
      .create(
        <ChakraProvider>
          <PokemonCard pokemon={pokemonData} />
        </ChakraProvider>
      )
      .toJSON();

    expect(elem).toMatchSnapshot();
  });
});
