import { Button, Text, Flex, Image, Link } from '@chakra-ui/react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import pokemonballImage from './pokemonball.png';

function getNavTitle(pathname: string) {
  if (pathname === '/') {
    return 'Find your favorite pokemon';
  }
  if (pathname.includes('pokemon/')) {
    return 'Details';
  }
  if (pathname.includes('create')) {
    return 'Create your own pokemon';
  }
  return '';
}

export const Nav = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex
      p={2}
      mb={2}
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      boxShadow="base"
      rounded="md"
      bg="white"
    >
      <Link as={RouterLink} to="/">
        <Text textAlign="left" color="black" width="250px">
          <Image
            mr={2}
            display="inline"
            borderRadius="xl"
            boxSize="30px"
            objectFit="cover"
            src={pokemonballImage}
            alt="pokeball"
          />
          {getNavTitle(pathname)}
        </Text>
      </Link>
      <Link as={RouterLink} to="/create">
        <Button bgColor="red.500" color="white" h="1.75rem" p={4}>
          <PlusSquareIcon fontSize="2xl" />
        </Button>
      </Link>
    </Flex>
  );
};

export default Nav;
