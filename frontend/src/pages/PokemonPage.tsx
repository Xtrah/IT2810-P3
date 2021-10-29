import { useQuery } from '@apollo/client';
import {
  Alert,
  AlertIcon,
  Container,
  Spinner,
  Image,
  Box,
  Text,
  Link,
  Heading,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useParams } from 'react-router-dom';
import getGradientByType from '../utils/getGradientByType';
import getIconByType from '../utils/getIconByType';
import { GET_POKEMON } from '../utils/queries';

export const PokemonPage = () => {
  const { id } = useParams<{ id: string }>();
  const { error, loading, data } = useQuery(GET_POKEMON, {
    variables: { _id: id },
  });
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

  if (!data) {
    return <></>;
  }

  const { pokemon } = data;

  return (
    <Box>
      <Container>
        <Link as={RouterLink} to="/" color="red.500" fontWeight="bold">
          <Text>
            <ArrowBackIcon boxSize={10} />
            Back to search
          </Text>
        </Link>
        <Image
          borderRadius="xl"
          width="100%"
          maxHeight="250px"
          objectFit="contain"
          src={pokemon.imageUrl}
          bgGradient={getGradientByType(pokemon.types[0])}
          // Fallback to Bulbasaur if image doesn't load
          fallbackSrc="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
          alt={pokemon.name}
        />
        <Box mb={5} mt={2}>
          <Heading textAlign="left" color="black">
            {pokemon.name}
            {pokemon.types.map((type: string) => (
              <Image
                key={type}
                ml={2}
                display="inline"
                borderRadius="xl"
                boxSize="20px"
                objectFit="cover"
                bgGradient={getGradientByType(type)}
                src={getIconByType(type)}
                alt={pokemon.name}
              />
            ))}
          </Heading>
          <Text textAlign="left">{pokemon.description}</Text>
        </Box>
        <Flex
          bgGradient={getGradientByType(pokemon.types[0])}
          flexDirection="row"
          justifyContent="space-around"
          borderRadius="md"
          p={2}
        >
          <Stack bgColor="rgba(255, 255, 255, 0.3)" borderRadius="md" p={2}>
            <Text textAlign="center" fontWeight="bold">
              Height
            </Text>
            <Text textAlign="center">{pokemon.height} cm</Text>
          </Stack>
          <Stack bgColor="rgba(255, 255, 255, 0.3)" borderRadius="md" p={2}>
            <Text textAlign="center" fontWeight="bold">
              Weight
            </Text>
            <Text textAlign="center">{pokemon.weight} kg</Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default PokemonPage;
