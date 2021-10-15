import mongoose from 'mongoose';

// Describes attributes for new pokemon
interface PokemonAttributes {
  name: string;
  description: string;
}

interface PokemonModel extends mongoose.Model<PokemonDoc> {
  build(attrs: PokemonAttributes): PokemonDoc;
}

// Mongoose adds document attributes, i.e. created_at
interface PokemonDoc extends mongoose.Document, PokemonAttributes {}

// Type definining for mongodb
const Schema = mongoose.Schema;
const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Use custom build method instead of new Item to support typechecking attributes.
pokemonSchema.statics.build = (attrs: PokemonAttributes) => {
  return new Pokemon(attrs);
};

const Pokemon = mongoose.model<PokemonDoc, PokemonModel>(
  'Pokemon',
  pokemonSchema
);

export { Pokemon, PokemonAttributes, PokemonDoc };
