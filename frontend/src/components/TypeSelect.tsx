import { Text, Select, HStack, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { pokemonFilterVar } from '../cache';
import setPokemonFilter from '../utils/setPokemonFilter';

// TypeSelect is a select-input for filtering pokemon according to pokemon types.
const TypeSelect = () => {
  const [pokemonType, setPokemonType] = useState('');

  // Update input and update cache
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value;
    setPokemonType(e.target.value);
    setPokemonFilter({
      type,
      sortDescending: pokemonFilterVar().sortDescending,
    });
  }

  return (
    <HStack>
      <Box minW="125px" p={4}>
        <Text fontWeight="500" fontSize="md">
          Select type:
        </Text>
      </Box>
      <Select
        borderColor="red.500"
        border="4px"
        value={pokemonType}
        onChange={handleChange}
      >
        <option value="">Show all</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dark">Dark</option>
        <option value="dragon">Dragon</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
      </Select>
    </HStack>
  );
};

export default TypeSelect;
