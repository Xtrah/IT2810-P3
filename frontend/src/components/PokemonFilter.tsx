import { Box, HStack, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { pokemonFilterVar } from '../types/cache';
import { setPokemonFilter } from '../utils/setPokemonFilter';
import TypeSelect from './TypeSelect';

const PokemonFilter = () => {
  const [pokemonSort, setPokemonSort] = useState('');

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

  return (
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
  );
};

export default PokemonFilter;
