const e = require('express');
const Project = require('../src/models/projectModel');
const {
  addProject,
  getAllProjects,
  getOneProjectById,
  updateProject,
  deleteProject,
} = require('../src/controllers/projectController');

jest.mock('../src/models/projectModel');

describe('addProject', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'New Project',
        description: 'Project description',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        skillsRequired: ['JavaScript', 'Node.js'],
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  jest.mock('../src/models/projectModel');

  describe('Project Controller', () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          name: 'New Project',
          description: 'Project description',
          startDate: '2025-01-01',
          endDate: '2025-12-31',
          skillsRequired: ['JavaScript', 'Node.js'],
        },
        params: {
          id: '1',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
    });

    describe('addProject', () => {
      it('should create a new project and return 201 status', async () => {
        Project.prototype.save = jest.fn().mockResolvedValue(req.body);

        await addProject(req, res);

        expect(Project.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
      });

      it('should return 500 status if there is an error', async () => {
        const errorMessage = 'Error creating project';
        Project.prototype.save = jest
          .fn()
          .mockRejectedValue(new Error(errorMessage));

        await addProject(req, res);

        expect(Project.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('getAllProjects', () => {
      it('should return all projects', async () => {
        const projects = [{ name: 'Project 1' }, { name: 'Project 2' }];
        Project.find = jest
          .fn()
          .mockReturnValue({ populate: jest.fn().mockResolvedValue(projects) });

        await getAllProjects(req, res);

        expect(Project.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(projects);
      });

      it('should return 500 status if there is an error', async () => {
        const errorMessage = 'Error fetching projects';
        Project.find = jest.fn().mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error(errorMessage)),
        });

        await getAllProjects(req, res);

        expect(Project.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('getOneProjectById', () => {
      it('should return a project by ID', async () => {
        const project = { id: 1, name: 'Project 1' };
        Project.find = jest.fn().mockResolvedValue([project]);

        await getOneProjectById(req, res);

        expect(Project.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(project);
      });

      it('should return 404 if project not found', async () => {
        Project.find = jest.fn().mockResolvedValue([]);

        await getOneProjectById(req, res);

        expect(Project.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Project not found');
      });

      it('should return 500 status if there is an error', async () => {
        const errorMessage = 'Error fetching project';
        Project.find = jest.fn().mockRejectedValue(new Error(errorMessage));

        await getOneProjectById(req, res);

        expect(Project.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('updateProject', () => {
      it('should update a project and return the updated project', async () => {
        const updatedProject = { id: 1, name: 'Updated Project' };
        Project.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProject);

        await updateProject(req, res);

        expect(Project.findByIdAndUpdate).toHaveBeenCalledWith(
          req.params.id,
          req.body,
          { new: true }
        );
        expect(res.json).toHaveBeenCalledWith(updatedProject);
      });

      it('should return 404 if project not found', async () => {
        Project.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        await updateProject(req, res);

        expect(Project.findByIdAndUpdate).toHaveBeenCalledWith(
          req.params.id,
          req.body,
          { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Project not found');
      });

      it('should return 500 status if there is an error', async () => {
        const errorMessage = 'Error updating project';
        Project.findByIdAndUpdate = jest
          .fn()
          .mockRejectedValue(new Error(errorMessage));

        await updateProject(req, res);

        expect(Project.findByIdAndUpdate).toHaveBeenCalledWith(
          req.params.id,
          req.body,
          { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('deleteProject', () => {
      it('should delete a project and return 204 status', async () => {
        Project.findByIdAndDelete = jest.fn().mockResolvedValue(true);

        await deleteProject(req, res);

        expect(Project.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
      });

      it('should return 404 if project not found', async () => {
        Project.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        await deleteProject(req, res);

        expect(Project.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Project not found');
      });

      it('should return 500 status if there is an error', async () => {
        const errorMessage = 'Error deleting project';
        Project.findByIdAndDelete = jest
          .fn()
          .mockRejectedValue(new Error(errorMessage));

        await deleteProject(req, res);

        expect(Project.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  });
});
