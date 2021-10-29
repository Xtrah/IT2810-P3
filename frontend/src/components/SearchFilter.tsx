import { useQuery } from '@apollo/client';
import { Box, Collapse, HStack, Select, Text } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { pokemonFilterVar } from '../cache';
import setPokemonFilter from '../utils/setPokemonFilter';
import TypeSelect from './TypeSelect';
import { GET_POKEMON_FILTER } from '../utils/queries';

interface Props {
  isOpen: boolean;
}

const SearchFilter = ({ isOpen }: Props) => {
  // Get filter to initialize select value
  const { data: filterData } = useQuery(GET_POKEMON_FILTER);
  const [pokemonSort, setPokemonSort] = useState(
    filterData.pokemonFilter.sortDescending
  );

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const sortDescending = e.target.value === 'true';
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
            bg="red.500"
            onChange={handleSortChange}
            value={pokemonSort}
            color="white"
            // This is to prevent white text being on white background in option select
            _focus={{
              color: 'black',
            }}
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
