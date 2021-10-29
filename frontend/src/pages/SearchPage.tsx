import {
  Alert,
  AlertIcon,
  Container,
  Input,
  useDisclosure,
  IconButton,
  HStack,
  Spinner,
  Button,
  Center,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED, GET_POKEMON_FILTER } from '../utils/queries';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';
import SearchFilter from '../components/SearchFilter';

// This value aligns with the hardcoded limit in backend
const ITEM_FETCH_LIMIT = 10;

// SearchPage contains search and search results
function SearchPage() {
  // Used for filterdisplay toggle
  const { isOpen, onToggle } = useDisclosure();

  const [searchText, setSearchText] = useState('');
  const { data: filterData } = useQuery(GET_POKEMON_FILTER);
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS_LIMITED, {
    variables: {
      name: searchText,
      sortDescending: filterData.pokemonFilter.sortDescending,
      type: filterData.pokemonFilter.type,
    },
  });

  // Start first fetchmore with offset, to add to the already fetched items
  const [offset, setOffset] = useState(ITEM_FETCH_LIMIT);
  // Query more items and update offset
  const onLoadMore = () => {
    fetchMore({
      variables: {
        name: searchText,
        offset,
      },
    }).then(() => setOffset(offset + ITEM_FETCH_LIMIT));
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
          name="search"
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

      <SearchFilter isOpen={isOpen} />

      {dataResult()}

      <Center height="100px">
        <Button
          disabled={loading}
          bgColor="red.500"
          color="white"
          h="1.75rem"
          size="sm"
          onClick={onLoadMore}
        >
          Load more
        </Button>
      </Center>
    </Container>
  );
}

export default SearchPage;
