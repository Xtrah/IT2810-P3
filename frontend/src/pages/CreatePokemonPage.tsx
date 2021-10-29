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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_POKEMON } from '../utils/queries';
import pokemonTypes from '../utils/pokemonTypes';

type Inputs = {
  name: string;
  description: string;
  primaryType: string;
  secondaryType: string;
  height: number;
  weight: number;
  imageUrl: string;
};

// Returns type(s) based on two type-inputs
const determineChosenTypes = (primaryType: string, secondaryType: string) => {
  // Return only primary if no secondary has been chosen or if secondary and primary are the same
  if (!secondaryType.length || secondaryType === primaryType) {
    return [primaryType];
  }
  return [primaryType, secondaryType];
};

// CreatePokemon is the page component for creating new pokemons
function CreatePokemonPage() {
  const [createPokemon, { error, loading }] = useMutation(CREATE_POKEMON);

  // Form-inputs that require controlling outside of useForm()-hook
  const [imageUrl, setImageUrl] = useState('');
  const [primaryType, setPrimaryType] = useState<string>('');
  const [secondaryType, setSecondaryType] = useState<string>('');

  const history = useHistory();
  // Handle form-state and register input-elements for validation and submission
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  // Handle submission of data
  const onSubmit: SubmitHandler<Inputs> = (submitData) => {
    createPokemon({
      variables: {
        ...submitData,
        types: determineChosenTypes(primaryType, secondaryType),
      },
    })
      .then((res) => history.push(`/project3/pokemon/${res.data.createPokemon._id}`))
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Create pokemon-request failed', err));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            aria-required
            aria-label="Name"
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
          <FormControl isInvalid={!!errors.height}>
            <FormLabel>Height (inches)</FormLabel>
            <Input
              id="height"
              aria-required
              aria-label="Height"
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
          <FormControl isInvalid={!!errors.weight}>
            <FormLabel>Weight (lbs)</FormLabel>
            <Input
              id="weight"
              aria-required
              aria-label="Weight"
              type="number"
              placeholder="123"
              borderColor="red.500"
              {...register('weight', {
                required: 'This is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Weight must be at least 1' },
              })}
            />
            <FormErrorMessage>
              {errors.weight && errors.weight.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl mt="10px" isInvalid={!!errors.primaryType}>
          <FormLabel>Primary type</FormLabel>
          <Select
            placeholder="Select primary type"
            id="primaryType"
            aria-required
            aria-label="Primary type"
            borderColor="red.500"
            {...register('primaryType', {
              required: 'This is required',
              onChange: (e) => setPrimaryType(e.target.value),
            })}
          >
            {pokemonTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.primaryType && errors.primaryType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={!!errors.secondaryType}>
          <FormLabel>Secondary type (optional)</FormLabel>
          <Select
            placeholder="Select secondary type"
            id="secondaryType"
            aria-label="Secondary type"
            borderColor="red.500"
            {...register('secondaryType', {
              onChange: (e) => setSecondaryType(e.target.value),
            })}
          >
            {pokemonTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.secondaryType && errors.secondaryType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            aria-label="Description of pokemon"
            placeholder="Description of pokemon"
            borderColor="red.500"
            {...register('description', {
              required: 'This is required',
            })}
          />
        </FormControl>
        <FormControl mt="10px" isInvalid={!!errors.imageUrl}>
          <FormLabel>Image Url</FormLabel>
          <Input
            id="imageUrl"
            aria-required
            aria-label="Image url"
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
          src={imageUrl || 'ImageNotFound.svg'}
          alt="Pokemon"
          borderColor="red.500"
          w="100%"
          maxHeight="250px"
          mb="10px"
        />
        {error && (
          <Alert status="error" mb="10px">
            <AlertIcon />
            Something went wrong! Please try again
          </Alert>
        )}
        <Button
          type="submit"
          bgColor="red.500"
          color="white"
          size="lg"
          w="100%"
          isLoading={isSubmitting}
          disabled={loading}
        >
          {loading ? (
            <>
              <CheckIcon mr="8px" />
              Submitting ...
            </>
          ) : (
            <>
              <PlusSquareIcon mr="8px" />
              Create Pokemon
            </>
          )}
        </Button>
      </form>
    </Container>
  );
}

export default CreatePokemonPage;
