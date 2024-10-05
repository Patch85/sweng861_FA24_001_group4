const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Talent Update', 'Project Status', 'User Activity'], // Placeholder examples
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	recipient: {
		type: mongoose.Schema.Types.ObjectId, // Link to a User document
		ref: 'User',
		required: true,
	},
	read: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

const Notif = mongoose.model('Notification', notifSchema);
module.exports = Notif;
