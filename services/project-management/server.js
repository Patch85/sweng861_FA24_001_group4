// services/project-management/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_FRONTEND_PROJECT_MANAGEMENT,
  process.env.CORS_ORIGIN_FRONTEND_TMS,
  process.env.CORS_ORIGIN_USER_MANAGEMENT,
  process.env.CORS_ORIGIN_TALENT_MANAGEMENT,
  process.env.CORS_ORIGIN_NOTIFICATIONS,
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection setup
mongoose
  .connect(process.env.DATABASE_URI, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the Project Management Service!");
});

// Define a port
const PORT = process.env.PORT || 5003;

// Start the server after MongoDB connection is established
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
