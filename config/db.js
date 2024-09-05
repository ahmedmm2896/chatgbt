const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ahmuhanna2896:cotJjkPIo36BKX7Z@cluster0.5lb0b.mongodb.net/ChatGbt?retryWrites=true&w=majority');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
