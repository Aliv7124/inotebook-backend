const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectToMongo;

