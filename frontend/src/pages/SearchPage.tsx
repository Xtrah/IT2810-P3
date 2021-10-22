import {
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Center,
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED } from '../utils/queries';
import SearchResults from '../components/SearchResults';

// SearchPage contains search and search results
function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS_LIMITED, {
    variables: { name: searchText }, // Queries when search text changes
  });

  const changeSettings = () => {
    // TODO: Set filter settings
  };

  // If searchText changes, reset offset
  useEffect(() => {
    setOffset(0);
  }, [searchText]);

  // Query more items and update offset
  const onLoadMore = () => {
    fetchMore({
      variables: {
        name: searchText,
        offset,
      },
    }).then(() => setOffset(offset + 10));
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

      <SearchResults data={data} loading={loading} error={error} />

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
