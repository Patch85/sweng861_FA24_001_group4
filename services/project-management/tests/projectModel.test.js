const mongoose = require('mongoose');
const Project = require('../src/models/projectModel');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Project Model Test', () => {
  it('should create and save a project successfully', async () => {
    const validProject = new Project({
      name: 'Test Project',
      description: 'A test project',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      status: 'Planning',
      skillsRequired: ['JavaScript', 'Node.js'],
      teamMembers: [],
    });
    const savedProject = await validProject.save();
    expect(savedProject._id).toBeDefined();
    expect(savedProject.name).toBe('Test Project');
    expect(savedProject.duration).toBe(364); // Duration in days
  });

  it('should fail to create a project without required fields', async () => {
    const projectWithoutRequiredFields = new Project({});
    let err;
    try {
      await projectWithoutRequiredFields.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.startDate).toBeDefined();
    expect(err.errors.endDate).toBeDefined();
  });

  it('should fail to create a project with endDate before startDate', async () => {
    const projectWithInvalidDates = new Project({
      name: 'Invalid Date Project',
      startDate: new Date('2023-12-31'),
      endDate: new Date('2023-01-01'),
    });
    let err;
    try {
      await projectWithInvalidDates.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.endDate).toBeDefined();
    expect(err.errors.endDate.message).toBe(
      'End date must be after start date'
    );
  });

  it('should log a message when a project is saved', async () => {
    console.log = jest.fn();
    const project = new Project({
      name: 'Logging Project',
      description: 'A project to test logging',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
    });
    await project.save();
    expect(console.log).toHaveBeenCalledWith(
      'Project Logging Project is being saved'
    );
  });
});
