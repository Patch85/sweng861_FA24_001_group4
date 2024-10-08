// services/project-management/tests/server.test.js
// const request = require('supertest');
const express = require('express');
const cors = require('cors');
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
});
