import { Text, Select, HStack, Box } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  handleFilterChange: (event: string) => void;
}

// TypeSelect is a select-input for filtering pokemon according to pokemon types.
const TypeSelect = ({ handleFilterChange }: Props) => {
  const [pokemonType, setPokemonType] = useState("");

  // Update input and update cache
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPokemonType(e.target.value);
    handleFilterChange(e.target.value);
  }

  return (
    <HStack>
      <Box minW="125px" p={4}>
        <Text fontWeight="500" fontSize="md">
          Select type:
        </Text>
      </Box>
      <Select
        bg="var(--chakra-colors-red-500);"
        color="white"
        value={pokemonType}
        onChange={handleChange}
      >
        <option value="">Show all</option>
        <option value="normal">Normal</option>
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
