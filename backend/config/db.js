const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb+srv://sharadsr69:sharad%40123@cluster0.vcqbw.mongodb.net/chat-app?retryWrites=true&w=majority'
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
