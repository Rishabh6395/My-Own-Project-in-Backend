const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// user auth APIs
router.post('/user/login', authController.loginUser);
router.post('/user/register', authController.registerUser);
router.get('/user/logout', authController.logoutUser);

// food partner auth APIs
router.post('/foodpartner/login', authController.loginFoodPartener);
router.post('/foodpartner/register', authController.registerFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner);

module.exports = router;
