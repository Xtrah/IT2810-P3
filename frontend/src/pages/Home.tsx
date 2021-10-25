import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
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
import TypeSelect from "../components/TypeSelect";
import { GET_POKEMON_FILTER } from "../utils/queries";
import { pokemonFilterVar } from "../cache";
import { setPokemonFilter } from "../utils/updateFilter";

// Home is the home page component, containing search and search results
function Home() {
  const [searchText, setSearchText] = useState("");
  const { data: pokemonFilter } = useQuery(GET_POKEMON_FILTER);
  const { loading, error, data } = useQuery(GET_POKEMONS_LIMITED, {
    variables: { name: searchText, type: pokemonFilterVar().type }, // Queries when search text changes
  });

  console.log(pokemonFilter.type);
  console.log(pokemonFilterVar());

  // temporary
  let sortDescending = false;

  const { isOpen, onToggle } = useDisclosure();

  const handleFilterChange = (type: string) => {
    setPokemonFilter({
      type,
      sortDescending,
    });
  };

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
          <TypeSelect handleFilterChange={handleFilterChange} />
        </Box>
      </Collapse>
      {dataResult()}
    </Container>
  );
}

export default Home;
