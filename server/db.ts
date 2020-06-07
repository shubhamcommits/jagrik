import mongoose from 'mongoose';

// Get Mongoose to use global promise library to avoid error messages
mongoose.Promise = global.Promise;

// Set up mongoose connection
var dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/jagrik';

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Connect mongoose to db
mongoose.connect(dbURL, options).catch((err) => {
  // Catch the Error on Production
  console.log('mongoose error: ', err);
  dbURL = 'mongodb://127.0.0.1:27017/jagrik';
  mongoose.connect(dbURL, options);
});

// Log Mongoose connection status changes:
mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log(`  🗄  Mongoose connection is open on\n\t${dbURL}`);
});

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Mongoose connection had an error:\n${err}`);
});

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose disconnected.');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log('Mongoose disconnected due to app termination processs.');
    process.exit(0);
  });
});
