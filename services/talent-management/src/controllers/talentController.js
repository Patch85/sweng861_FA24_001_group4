const Talent = require('../models/talentModel');

// Add new talent
exports.addTalent = async (req, res) => {
  try {
    const newTalent = new Talent(req.body);
    await newTalent.save();
    res.status(201).json(newTalent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all talent
exports.getAllTalent = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.json(talents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update talent by ID
exports.updateTalent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTalent = await Talent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTalent) return res.status(404).json({ msg: 'Talent not found' });
    res.json(updatedTalent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete talent by ID
exports.deleteTalent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTalent = await Talent.findByIdAndDelete(id);
    if (!deletedTalent) return res.status(404).json({ msg: 'Talent not found' });
    res.json({ msg: 'Talent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};