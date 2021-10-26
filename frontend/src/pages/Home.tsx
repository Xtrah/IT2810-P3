import {
  Alert,
  AlertIcon,
  Container,
  Input,
  Collapse,
  Box,
  useDisclosure,
  IconButton,
  HStack,
  Select,
  Text,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED, GET_POKEMON_FILTER } from '../utils/queries';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';
import TypeSelect from '../components/TypeSelect';
import { pokemonFilterVar } from '../types/cache';
import { setPokemonFilter } from '../utils/setPokemonFilter';

// Home is the home page component, containing search and search results
function Home() {
  const [searchText, setSearchText] = useState('');
  const { data: pokemonFilter } = useQuery(GET_POKEMON_FILTER);
  const [pokemonSort, setPokemonSort] = useState('');
  const { loading, error, data } = useQuery(GET_POKEMONS_LIMITED, {
    variables: {
      name: searchText,
      sortDescending: pokemonFilterVar().sortDescending,
      type: pokemonFilterVar().type,
    }, // Queries when search text changes
  });

  // temporary

  const { isOpen, onToggle } = useDisclosure();

  let sortDescending = pokemonSort === 'false';
  console.log(sortDescending);

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPokemonSort(e.target.value);
    handleFilterChange(pokemonFilterVar().type);
  }

  const handleFilterChange = (type: string) => {
    setPokemonFilter({
      type,
      sortDescending,
    });
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
        <Box
          p="20px"
          mt="4"
          border="2px"
          borderColor="red"
          rounded="md"
          shadow="md"
        >
          <TypeSelect handleFilterChange={handleFilterChange} />
          <HStack>
            <Box minW="125px" p={4}>
              <Text fontWeight="500" fontSize="md">
                Sort names:
              </Text>
            </Box>

            <Select
              bg="var(--chakra-colors-red-500);"
              color="white"
              value={pokemonSort}
              onChange={handleSortChange}
            >
              <option value="false">Ascending</option>
              <option value="true">Descending</option>
            </Select>
          </HStack>
        </Box>
      </Collapse>
      {dataResult()}
    </Container>
  );
}

export default Home;
