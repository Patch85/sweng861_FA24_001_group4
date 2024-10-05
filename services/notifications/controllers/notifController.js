const Notif = require('../models/notifModel');

// Send a new notif
exports.sendNotif = async (req, res) => {
	try {
		const notif = new Notif(req.body);
		await notif.save();
		res.status(201).json(notif);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all notifs for a user
exports.getNotifs = async (req, res) => {
	try {
		const notifs = await Notif.find({ recipient: req.params.userId });
		res.json(notifs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Mark a notif as read
exports.markAsRead = async (req, res) => {
	try {
		const notif = await Notif.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
		if (!notif) return res.status(404).json({ msg: 'Notification not found' });
		res.json(notif);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a notif
exports.deleteNotif = async (req, res) => {
	try {
		const notif = await Notif.findByIdAndDelete(req.params.id);
		if (!notif) return res.status(404).json({ msg: 'Notification not found' });
		res.json({ msg: 'Notification deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
