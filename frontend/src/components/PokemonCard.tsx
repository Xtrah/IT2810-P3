import { Box, Center, Text, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { PokemonLimited } from '../types/pokemon';
import { getGradientByType } from '../utils/getGradientByType';
import getIconByType from '../utils/getIconByType';

interface Props {
  pokemon: PokemonLimited;
}

// PokemonCard is used as list item in search results
const PokemonCard = ({ pokemon }: Props) => (
  <Link as={RouterLink} to={`/pokemon/${pokemon._id}`}>
    <Center
      key={pokemon._id}
      borderRadius="xl"
      mt={2}
      mb={2}
      h="100px"
      bgGradient={getGradientByType(pokemon.types[0])}
      _hover={{
        opacity: '0.7',
        transition: '0.5s',
      }}
    >
      <Box mr={5}>
        <Text color="white">
          {pokemon.name}
          <Image
            ml={2}
            display="inline"
            borderRadius="xl"
            boxSize="20px"
            objectFit="cover"
            src={getIconByType(pokemon.types[0])}
            alt={pokemon.name}
          />
        </Text>
      </Box>
      <Image
        borderRadius="xl"
        boxSize="50px"
        objectFit="cover"
        src={pokemon.imageUrl}
        // Fallback to Bulbasaur if image doesn't load
        fallbackSrc="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
        alt={pokemon.name}
      />
    </Center>
  </Link>
);

export default PokemonCard;
