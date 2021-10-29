import { Box, Collapse, HStack, Select, Text } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { pokemonFilterVar } from '../types/cache';
import setPokemonFilter from '../utils/setPokemonFilter';
import TypeSelect from './TypeSelect';

interface Props {
  isOpen: boolean;
}

const SearchFilter = ({ isOpen }: Props) => {
  const [pokemonSort, setPokemonSort] = useState('');

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const sortDescending = JSON.parse(e.target.value);
    setPokemonSort(e.target.value);
    setPokemonFilter({
      type: pokemonFilterVar().type,
      sortDescending,
    });
  }

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box
        p="20px"
        mt="4"
        border="2px"
        borderColor="red.500"
        rounded="md"
        shadow="md"
      >
        <TypeSelect />
        <HStack>
          <Box minW="125px" p={4}>
            <Text fontWeight="500" fontSize="md">
              Sort names:
            </Text>
          </Box>

          <Select
            // bg="red.500"
            // color="white"
            borderColor="red.500"
            border="4px"
            value={pokemonSort}
            onChange={handleSortChange}
          >
            <option value="false">Ascending</option>
            <option value="true">Descending</option>
          </Select>
        </HStack>
      </Box>
    </Collapse>
  );
};

export default SearchFilter;
