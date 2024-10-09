require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notifRoutes = require('./routes/notifRoutes');
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
	process.env.CORS_ORIGIN_FRONTEND_PROJECT_MANAGEMENT,
	process.env.CORS_ORIGIN_FRONTEND_TMS,
	process.env.CORS_ORIGIN_USER_MANAGEMENT,
	process.env.CORS_ORIGIN_PROJECT_MANAGEMENT,
	process.env.CORS_ORIGIN_NOTIFICATIONS,
];

app.use(cors({ origin: allowedOrigins }));

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection setup
mongoose
	.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.error('MongoDB connection error:', err));

// Use notification routes
app.use('/notifications', notifRoutes);

// Define a port
const PORT = process.env.PORT || 5004;
mongoose.connection.once('open', () => {
	app.listen(PORT, () => {
		console.log(`Notifications Service running on port ${PORT}`);
	});
});
