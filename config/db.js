const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace <db_password> with your actual password and 'myDatabaseName' with the name of your database
    await mongoose.connect('mongodb+srv://ahmuhanna2896:cotJjkPIo36BKX7Z@cluster0.5lb0b.mongodb.net/ChatGbt.ChatGBT
?retryWrites=true&w=majority');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
