// services/project-management/tests/server.test.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_FRONTEND_PROJECT_MANAGEMENT,
  process.env.CORS_ORIGIN_FRONTEND_TMS,
  process.env.CORS_ORIGIN_USER_MANAGEMENT,
  process.env.CORS_ORIGIN_TALENT_MANAGEMENT,
  process.env.CORS_ORIGIN_NOTIFICATIONS,
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

describe('CORS Configuration', () => {
  it('should contain the correct allowed origins', () => {
    expect(allowedOrigins).toContain(
      process.env.CORS_ORIGIN_FRONTEND_PROJECT_MANAGEMENT
    );
    expect(allowedOrigins).toContain(process.env.CORS_ORIGIN_FRONTEND_TMS);
    expect(allowedOrigins).toContain(process.env.CORS_ORIGIN_USER_MANAGEMENT);
    expect(allowedOrigins).toContain(process.env.CORS_ORIGIN_TALENT_MANAGEMENT);
    expect(allowedOrigins).toContain(process.env.CORS_ORIGIN_NOTIFICATIONS);
  });

  it('should not contain any other origins', () => {
    const origins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ];

    origins.forEach((origin) => {
      expect(allowedOrigins).not.toContain(origin);
    });
  });
});

describe('Database Connection', () => {
  let connectSpy;

  beforeAll(() => {
    connectSpy = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation(() => Promise.resolve());
  });

  afterAll(() => {
    connectSpy.mockRestore();
  });

  it('should call mongoose.connect with the correct URI', async () => {
    const databaseUri = process.env.DATABASE_URI;
    await mongoose.connect(databaseUri, {});
    expect(connectSpy).toHaveBeenCalledWith(databaseUri, {});
  });
  it('should call mongoose.connection.once with "open" event', () => {
    const onceSpy = jest.spyOn(mongoose.connection, 'once');
    mongoose.connection.once('open', () => {});
    expect(onceSpy).toHaveBeenCalledWith('open', expect.any(Function));
    onceSpy.mockRestore();
  });
});
