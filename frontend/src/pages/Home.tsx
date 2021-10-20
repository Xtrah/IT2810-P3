import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Collapse,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS_LIMITED } from "../utils/queries";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types/pokemon";

// Home is the home page component, containing search and search results
function Home() {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const { loading, error, data } = useQuery(GET_POKEMONS_LIMITED, {
    variables: { name: searchText, type: filterType }, // Queries when search text changes
  });

  const { isOpen, onToggle } = useDisclosure();

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
      <InputGroup size="md">
        <Input
          value={searchText}
          pr="4rem"
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={onToggle}>
          Filter
          <SettingsIcon />
        </Button>
        <InputRightElement width="2.5rem"></InputRightElement>
      </InputGroup>

      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          mt="4"
          border="2px"
          borderColor="red"
          rounded="md"
          shadow="md"
        >
          <Select
            onChange={(e) => setFilterType(e.target.value)}
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
        </Box>
      </Collapse>
      {dataResult()}
    </Container>
  );
}

export default Home;
