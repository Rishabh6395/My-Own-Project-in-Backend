const express = require('express');
const foodCountroller = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');  
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

// add protected route
router.post('/',
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single('Video'), 
    foodCountroller.createFood);

// GET /api/food 
router.get('/', authMiddleware.authUserMiddleware, 
    foodCountroller.getAllFoods);

module.exports = router;