import { Select } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  handleFilterChange: (event: string) => void;
}

// TypeSelect is used as selector of possible types
const TypeSelect = ({ handleFilterChange }: Props) => {
  const [pokemonType, setPokemonType] = useState("");

  // handlesubmit
  // - onchange innad typeselect
  // - kall til handlesubmit hvor det leveres den endrede dropdownchangen
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPokemonType(e.target.value);
    handleFilterChange(e.target.value);
  }

  return (
    <Select value={pokemonType} onChange={handleChange}>
      <option value="">Show all</option>
      <option value="normal">Normal</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
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
  );
};

export default TypeSelect;
