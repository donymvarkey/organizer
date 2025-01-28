const express = require('express');
const middlewares = require('../middlewares/Auth.middleware');
const { getUserProfile } = require('../controllers/UserController');

const router = express.Router();

router.get('/me', middlewares.isAuthorized, getUserProfile);

module.exports = router;
