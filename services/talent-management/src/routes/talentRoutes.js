const express = require('express');
const talentController = require('../controllers/talentController');

const router = express.Router();

// Add new talent
router.post('/data', talentController.addTalent);

// Get all talent
router.get('/data', talentController.getAllTalent);

// Update talent by ID
router.put('/data/:id', talentController.updateTalent);

// Delete talent by ID
router.delete('/data/:id', talentController.deleteTalent);

module.exports = router;