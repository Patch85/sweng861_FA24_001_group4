const Project = require("../models/projectModel");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
exports.getOneProjectById = async (req, res) => {
  try {
    const project = await projects.find(
      (p) => p.id === parseInt(req.params.id)
    );
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new project
exports.addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProject) return res.status(404).send("Project not found");
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).send("Project not found");
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
