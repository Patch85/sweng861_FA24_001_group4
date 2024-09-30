const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  // First name is required
    trim: true,      // Removes leading/trailing whitespace
  },
  lastName: {
    type: String,
    required: true,  // Last name is required
    trim: true,      // Removes leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,  // Email is required
    unique: true,    // Ensures email is unique in the database
    trim: true,      // Removes leading/trailing whitespace
    lowercase: true, // Converts the email to lowercase before saving
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  // Validates email format
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,  // Password is required
    minlength: 7,    // Minimum length for the password
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets the creation date
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;