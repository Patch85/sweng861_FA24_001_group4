const express = require("express");
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const authRoutes = require('./src/routes/authRoutes'); // Import authentication routes
require('dotenv').config();

const app = express();

// Allow CORS for the front-end origin
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection setup
const mongoURI = 'mongodb://localhost:27017/your-database-name';  // Replace 'your-database-name' with your actual DB name
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use authentication routes
app.use('/', authRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the User Management Service!");
});

// Define a port
const PORT = process.env.PORT || 5001;

// Start the server after MongoDB connection is established
mongoose.connection.once('open', () => {
  console.log('MongoDB connection is open');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});