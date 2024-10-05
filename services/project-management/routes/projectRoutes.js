const express = require('express');

const router = express.Router();
const projectController = require('../controllers/projectController');

// Mock data
let projects = [];

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Get a single project by ID
router.get('/projects/:id', projectController.getOneProject);

// Create a new project
router.post('/projects', projectController.addProject);

// Update an existing project
router.put('/projects/:id', (req, res) => {
  const project = projects.find((p) => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('Project not found');

  project.name = req.body.name;
  project.description = req.body.description;
  res.json(project);
});

// Delete a project
router.delete('/projects/:id', (req, res) => {
  const projectIndex = projects.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (projectIndex === -1) return res.status(404).send('Project not found');

  projects.splice(projectIndex, 1);
  res.status(204).send();
});

module.exports = router;
