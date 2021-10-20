import { Box, Center, Text, Image, Select } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { PokemonLimited } from '../types/pokemon';
import { getGradientByType } from '../utils/getGradientByType';
import getIconByType from '../utils/getIconByType';

interface Props {
  setSelectedType: Dispatch<SetStateAction<string>>;
}

// TypeSelect is used as selector of possible types
const TypeSelect = ({ setSelectedType }: Props) => {
  return (
    <Select
    onChange={(e) => setSelectedType(e.target.value)}
    defaultValue={""}
  >
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
