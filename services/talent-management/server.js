require('dotenv').config();

const express = require('express');
const cors = require('cors');
const talentRoutes = require('./src/routes/talentRoutes');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

// Connect to the database
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: 'http://localhost:3000',  // The origin of your frontend
}));

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