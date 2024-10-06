require('dotenv').config();

const express = require('express');
const cors = require('cors');
const talentRoutes = require('./src/routes/talentRoutes');
const mongoose = require('mongoose');
const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_FRONTEND_PROJECT_MANAGEMENT,
  process.env.CORS_ORIGIN_FRONTEND_TMS,
  process.env.CORS_ORIGIN_USER_MANAGEMENT,
  process.env.CORS_ORIGIN_PROJECT_MANAGEMENT,
  process.env.CORS_ORIGIN_NOTIFICATIONS,
];

// Connect to the database
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(cors());
app.use(express.json());

// Use talent routes
app.use('/', talentRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Talent Management Service running on port ${PORT}`);
});

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});