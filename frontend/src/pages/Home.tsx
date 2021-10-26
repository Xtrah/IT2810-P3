import {
  Alert,
  AlertIcon,
  Container,
  Input,
  Collapse,
  useDisclosure,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED, GET_POKEMON_FILTER } from '../utils/queries';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';
import { pokemonFilterVar } from '../types/cache';
import PokemonFilter from '../components/PokemonFilter';

// Home is the home page component, containing search and search results
function Home() {
  const [searchText, setSearchText] = useState('');
  const { data: pokemonFilter } = useQuery(GET_POKEMON_FILTER);
  const { loading, error, data } = useQuery(GET_POKEMONS_LIMITED, {
    variables: {
      name: searchText,
      sortDescending: pokemonFilterVar().sortDescending,
      type: pokemonFilterVar().type,
    }, // Queries when search text changes
  });

  // temporary

  const { isOpen, onToggle } = useDisclosure();

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
      <HStack spacing={2}>
        <Input
          value={searchText}
          pr="4rem"
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton
          onClick={onToggle}
          aria-label="Search database"
          colorScheme="red"
          icon={<SettingsIcon />}
        />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <PokemonFilter />
      </Collapse>
      {dataResult()}
    </Container>
  );
}

export default Home;
