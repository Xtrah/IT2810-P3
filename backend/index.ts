import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rljgw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  try {
    // @ts-ignore https://stackoverflow.com/questions/68806347/argument-of-type-usenewurlparser-boolean-useunifiedtopology-boolean-is-n
    await mongoose.connect(uri, options);
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
