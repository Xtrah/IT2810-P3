import { Text, Select, HStack, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { pokemonFilterVar } from '../cache';
import pokemonTypes from '../utils/pokemonTypes';
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
        bg="red.500"
        color="white"
        value={pokemonType}
        onChange={handleChange}
        // This is to prevent white text being on white background in option select
        _focus={{
          color: 'black',
        }}
      >
        {pokemonTypes.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default TypeSelect;
