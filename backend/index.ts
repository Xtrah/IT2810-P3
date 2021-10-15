import mongoose from 'mongoose';
import { app } from './app';

// Secrets should be kept secret, for example env file, but hardcoded here for the project
const DBUSER = 'admin';
const DBPASSWORD = 'admin';
const DBNAME = 'pokedex';

const start = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const uri = `mongodb://${DBUSER}:${DBPASSWORD}@it2810-15.idi.ntnu.no:27017/${DBNAME}?authSource=${DBUSER}`;

  try {
    // @ts-ignore https://stackoverflow.com/questions/68806347/argument-of-type-usenewurlparser-boolean-useunifiedtopology-boolean-is-n
    await mongoose.connect(uri, options);
    console.log(`Connected to ${DBNAME}`);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();