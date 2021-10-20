import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Image,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_POKEMON } from "../utils/queries";




// CreatePokemon is the page component for creating new pokemons
function CreatePokemon() {
  const [name, setName] = useState("Test");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("Test");
  const [imageUrl, setImageUrl] = useState("Test");

  let pokemon = {
    name: name,
    description: description,
    types: ["grass"],
    weight: weight,
    height: height,
    imageUrl: imageUrl,
  }
  const [createPokemon] = useMutation(CREATE_POKEMON);

  return (
    <Container>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          aria-required
          aria-label="Name input"
          value={name}
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => setName(e.target.value)}
          mb="10px"
          borderColor="red.500"
        />
      </FormControl>
      <Flex align="center" justify="center">
        <FormControl isRequired>
          <FormLabel>Height (inches)</FormLabel>
          <NumberInput
            aria-required
            aria-label="Height input"
            value={height}
            placeholder="123"
            onChange={(value) => setHeight(parseInt(value))}
            mb="10px"
            mr="5px"
            borderColor="red.500"
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Weight (lbs)</FormLabel>
          <NumberInput
            aria-required
            aria-label="Weight input"
            value={weight}
            placeholder="123"
            onChange={(value) => setWeight(parseInt(value))}
            mb="10px"
            borderColor="red.500"
          >
            <NumberInputField w="100%" />
          </NumberInput>
        </FormControl>
      </Flex>
      <b>INSERT SELECT HER</b>
      <FormControl>
        <FormLabel>
          Description ({description.length} of 120 characters used)
        </FormLabel>
        <Textarea
          aria-label="Description of pokemon input"
          value={description}
          placeholder="Description of pokemon"
          onChange={(e) =>
            e.target.value.length <= 120 && setDescription(e.target.value)
          }
          borderColor="red.500"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Image Url</FormLabel>
        <Input
          aria-required
          aria-label="Image url input"
          value={imageUrl}
          type="text"
          placeholder="Enter url for image of pokemon"
          onChange={(e) => setImageUrl(e.target.value)}
          mb="10px"
          borderColor="red.500"
        />
      </FormControl>
      <Image
        boxSize="200px"
        objectFit="cover"
        placeholder=""
        fallbackSrc="https://bitsofco.de/content/images/2018/12/broken-1.png"
        src={
          imageUrl
            ? imageUrl
            : "https://i.dailymail.co.uk/i/pix/2016/07/13/23/363F755900000578-3688612-A_crowd_of_Pokemon_characters_hides_one_of_the_game_s_most_popul-a-107_1468450011097.jpg"
        }
        alt="Pokemon"
        borderColor="red.500"
        w="100%"
        mb="10px"
      />
      <Button
        onClick={() => createPokemon({ variables: pokemon })}
        bgColor="red.500"
        color="white"
        size="lg"
        w="100%"
      >
        <CheckIcon mr="8px" /> Create Pokemon
      </Button>
    </Container>
  );
}

export default CreatePokemon;
