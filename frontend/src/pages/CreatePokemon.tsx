import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Flex,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POKEMON } from '../utils/queries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { pokemonTypes } from '../utils/pokemonTypes';
import { useHistory } from 'react-router';

type Inputs = {
  name: string;
  description: string;
  primaryType: string;
  secondaryType: string;
  height: number;
  weight: number;
  imageUrl: string;
};

// CreatePokemon is the page component for creating new pokemons
function CreatePokemon() {
  const [imageUrl, setImageUrl] = useState('Test');
  const [createPokemon, {data}] = useMutation(CREATE_POKEMON);
  const [primaryType, setPrimaryType] = useState<string>('');
  const [secondaryType, setSecondaryType] = useState<string>('');
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (submitData) => {
    createPokemon({
      variables: {
        ...submitData,
        types: !secondaryType.length
          ? [primaryType]
          : secondaryType === primaryType
          ? [primaryType]
          : [primaryType, secondaryType],
      },
    })
      // TODO: Redirect
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name ? true : false}>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            aria-required
            aria-label="Name input"
            type="text"
            placeholder="Enter pokemon name"
            borderColor="red.500"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 3, message: 'Minimum length should be 3' },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Flex mt="10px">
          <FormControl isInvalid={errors.height ? true : false}>
            <FormLabel>Height (inches)</FormLabel>
            <Input
              id="height"
              aria-required
              aria-label="Height input"
              mr="5px"
              type="number"
              placeholder="123"
              borderColor="red.500"
              {...register('height', {
                required: 'This is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Height must be at least 1' },
              })}
            />
            <FormErrorMessage>
              {errors.height && errors.height.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.weight ? true : false}>
            <FormLabel>Weight (lbs)</FormLabel>
            <Input
              id="weight"
              aria-required
              aria-label="Weight input"
              type="number"
              placeholder="123"
              borderColor="red.500"
              {...register('weight', {
                required: 'This is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Weight must be at least 1' },
              })}
            ></Input>
            <FormErrorMessage>
              {errors.weight && errors.weight.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl mt="10px" isInvalid={errors.primaryType ? true : false}>
          <FormLabel>Primary type</FormLabel>
          <Select
            placeholder="Select primary type"
            id="primaryType"
            aria-required
            aria-label="Primary type select"
            borderColor="red.500"
            {...register('primaryType', {
              required: 'This is required',
              onChange: (e) => setPrimaryType(e.target.value),
            })}
          >
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.primaryType && errors.primaryType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={errors.secondaryType ? true : false}>
          <FormLabel>Secondary type (optional)</FormLabel>
          <Select
            placeholder="Select secondary type"
            id="secondaryType"
            aria-label="Secondary type select"
            borderColor="red.500"
            {...register('secondaryType', {
              onChange: (e) => setSecondaryType(e.target.value),
            })}
          >
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.secondaryType && errors.secondaryType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={errors.description ? true : false}>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            aria-label="Description of pokemon input"
            placeholder="Description of pokemon"
            borderColor="red.500"
            {...register('description', {
              required: 'This is required',
            })}
          />
        </FormControl>
        <FormControl mt="10px" isInvalid={errors.imageUrl ? true : false}>
          <FormLabel>Image Url</FormLabel>
          <Input
            id="imageUrl"
            aria-required
            aria-label="Image url input"
            type="text"
            placeholder="Enter url for image of pokemon"
            borderColor="red.500"
            {...register('imageUrl', {
              onChange: (e) => setImageUrl(e.target.value),
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors.imageUrl && errors.imageUrl.message}
          </FormErrorMessage>
        </FormControl>
        <FormLabel mt="10px">Image preview</FormLabel>
        <Image
          boxSize="260px"
          objectFit="contain"
          placeholder=""
          border="1px"
          borderRadius="5px"
          fallbackSrc="ImageNotFound.svg"
          src={imageUrl ? imageUrl : 'ImageNotFound.svg'}
          alt="Pokemon"
          borderColor="red.500"
          w="100%"
          maxHeight="250px"
          mb="10px"
        />
        <Button
          type="submit"
          bgColor="red.500"
          color="white"
          size="lg"
          w="100%"
          isLoading={isSubmitting}
          disabled={isSubmitSuccessful}
        >
          {isSubmitSuccessful ? (
            <>
              <CheckIcon mr="8px" /> Submitted redirecting...
            </>
          ) : (
            <>
              <PlusSquareIcon mr="8px" /> Create Pokemon
            </>
          )}
        </Button>
      </form>
    </Container>
  );
}

export default CreatePokemon;
