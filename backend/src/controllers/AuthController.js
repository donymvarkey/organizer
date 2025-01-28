const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const httpResponse = require('../utils/httpResponse');
const { createUser, loginService } = require('../services/AuthService');

const signUp = async (req, res, next) => {
  try {
    await body('name').notEmpty().withMessage('Name is required').run(req);
    await body('email').isEmail().withMessage('Invalid email address').run(req);
    await body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return httpResponse(req, res, 400, 'Validation failed', errors.array());
    }

    const dbRes = await createUser(req.body);

    if (dbRes instanceof Error) {
      throw dbRes;
    }

    return httpResponse(req, res, 201, 'User created successfully', {});
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    await body('email').isEmail().withMessage('Invalid email address').run(req);
    await body('password')
      .notEmpty()
      .withMessage('Password is required')
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return httpResponse(req, res, 400, 'Validation failed', errors.array());
    }

    const { email, password } = req.body;

    const dbRes = await loginService(email, password);

    if (!dbRes) {
      return httpResponse(req, res, 401, 'Invalid email or password', {});
    }

    let payload = {
      id: dbRes._id,
      email: dbRes.email,
    };

    const token = jwt.sign(payload, process.env.SECRET);

    payload = {
      ...payload,
      token,
    };

    return httpResponse(req, res, 200, 'Login successful', payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login };
