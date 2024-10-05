const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', (req, res) => {
  res.send('Project Management Service');
});

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Get a single project by ID
router.get('/projects/:id', projectController.getOneProjectById);

// Create a new project
router.post('/projects', projectController.addProject);

// Update an existing project
router.put('/projects/:id', projectController.updateProject);

// Delete a project
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
