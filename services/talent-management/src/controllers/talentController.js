const Talent = require("../models/talentModel");

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
    const updatedTalent = await Talent.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTalent)
      return res.status(404).json({ msg: "Talent not found" });
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
    if (!deletedTalent)
      return res.status(404).json({ msg: "Talent not found" });
    res.json({ msg: "Talent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bulkUpload = async (req, res) => {
  const { talents } = req.body;

  // Validation function
  const validateTalent = (talent) => {
    const errors = [];

    if (!talent.firstName || talent.firstName.trim() === "") {
      errors.push("First name is required");
    }
    if (!talent.lastName || talent.lastName.trim() === "") {
      errors.push("Last name is required");
    }
    if (!talent.email || !/\S+@\S+\.\S+/.test(talent.email)) {
      errors.push("A valid email is required");
    }
    if (!talent.position || talent.position.trim() === "") {
      errors.push("Position is required");
    }
    if (!talent.phoneNumber || !/^[0-9]{10,15}$/.test(talent.phoneNumber)) {
      errors.push("Phone number should be between 10 to 15 digits");
    }
    if (
      !talent.availability.startDate ||
      !Date.parse(talent.availability.startDate)
    ) {
      errors.push("Start date is invalid");
    }
    if (
      !talent.availability.endDate ||
      !Date.parse(talent.availability.endDate)
    ) {
      errors.push("End date is invalid");
    }
    if (talent.skills.length === 0) {
      errors.push("At least one skill must be provided");
    }

    return errors;
  };

  try {
    const validationErrors = [];

    for (let talent of talents) {
      const errors = validateTalent(talent);
      if (errors.length > 0) {
        validationErrors.push({
          talent,
          errors,
        });
      } else {
        const newTalent = new Talent(talent);
        await newTalent.save();
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Some talents have validation errors",
        errors: validationErrors,
      });
    }

    res.status(201).json({ message: "Bulk upload successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload talent data" });
  }
};
