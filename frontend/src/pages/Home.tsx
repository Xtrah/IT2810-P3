import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED } from '../utils/queries';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';

// Home is the home page component, containing search and search results
function Home() {
  const [searchText, setSearchText] = useState('');
  const { loading, error, data } = useQuery(GET_POKEMONS_LIMITED, {
    variables: { name: searchText }, // Queries when search text changes
  });

  const changeSettings = () => {
    console.log('Click');
  };

  // Returns UI according to status of data
  const dataResult = () => {
    if (error) {
      return (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      );
    }
    if (loading) {
      return <Spinner color="red.500" />;
    }
    if (data) {
      return data.pokemons?.map((pokemon: Pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon._id} />
      ));
    }
    return null;
  };

  return (
    <Container>
      <InputGroup size="md" mb={4}>
        <Input
          name="searchInput"
          value={searchText}
          pr="4rem"
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <InputRightElement width="2.5rem">
          <Button
            bgColor="red.500"
            color="white"
            h="1.75rem"
            size="sm"
            m={2}
            onClick={changeSettings}
          >
            <SettingsIcon />
          </Button>
        </InputRightElement>
      </InputGroup>

      {dataResult()}
    </Container>
  );
}

export default Home;
