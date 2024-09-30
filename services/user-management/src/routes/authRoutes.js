// src/routes/authRoutes.js
const express = require('express');
const { check, ExpressValidator } = require('express-validator');
const authController = require('../controllers/authController'); 

const router = express.Router();

router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('registerPassword', 'Password is required').isLength({ min: 6 }),
  ],
  authController.register
);

// Login Route
router.post(
  '/login',
  [
    check('loginEmail', 'Please include a valid email').isEmail(),
    check('loginPassword', 'Password is required').exists(),  // Make sure password exists
  ],
  authController.login  // The login function from your controller
);

module.exports = router;