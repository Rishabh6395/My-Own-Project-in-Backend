const express = require('express');
const foodCountroller = require('../controllers/food.controller');
const aurthMiddleware = require('../middlewares/auth.middleware');  
const router = express.Router();

// add protected route
router.post('/', aurthMiddleware.authFoodPartnerMiddleware, foodCountroller.createFood);

module.exports = router;