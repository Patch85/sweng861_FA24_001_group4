const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  availability: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  skills: [String],
});

const Talent = mongoose.model('Talent', talentSchema);
module.exports = Talent;