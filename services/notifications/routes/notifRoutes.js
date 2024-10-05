const express = require('express');
const notifController = require('../controllers/notifController');
const router = express.Router();

// Send a new notification
router.post('/', notifController.sendNotification);

// Get all notifications for a user
router.get('/:userId', notifController.getNotifications);

// Mark a notification as read
router.put('/:id/read', notifController.markAsRead);

// Delete a notification
router.delete('/:id', notifController.deleteNotification);

module.exports = router;
