const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// router.post('/user/login', authController.loginUser);
router.post('/user/register', authController.registerUser);

module.exports = router;
