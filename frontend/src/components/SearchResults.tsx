import { ApolloError } from '@apollo/client';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { PokemonLimited } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface Props {
  data: { pokemons: PokemonLimited[] };
  loading: boolean;
  error: ApolloError | undefined;
}

// Display data or handle error
export default function SearchResults({ data, error, loading }: Props) {
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

  return (
    <>
      {data.pokemons?.map((pokemon: PokemonLimited) => (
        <PokemonCard pokemon={pokemon} key={pokemon._id} />
      ))}
    </>
  );
}
