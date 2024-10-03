// src/controllers/dataController.js
const Data = require('../models/dataModel');

exports.createData = async (req, res) => {
  const { name, description, email } = req.body;

  try {
    const newData = new Data({
      name,
      description,
      email,
      createdBy: req.user,  // User ID from JWT middleware
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getData = async (req, res) => {
    try {
      const data = await Data.find();
      res.json(data);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  exports.updateData = async (req, res) => {
    const { name, description, email } = req.body;
    const { id } = req.params;
  
    try {
      let data = await Data.findById(id);
      if (!data) {
        return res.status(404).json({ msg: 'Data not found' });
      }
  
      // Update fields
      data.name = name || data.name;
      data.description = description || data.description;
      data.email = email || data.email;
  
      await data.save();
      res.json(data);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  exports.deleteData = async (req, res) => {
    const { id } = req.params;
  
    try {
      let data = await Data.findById(id);
      if (!data) {
        return res.status(404).json({ msg: 'Data not found' });
      }
  
      await data.remove();
      res.json({ msg: 'Data removed' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  };