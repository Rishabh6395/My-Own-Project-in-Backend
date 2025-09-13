const express = require('express');
const foodCountroller = require('../controllers/food.controller');
const aurthMiddleware = require('../middlewares/auth.middleware');  
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

// add protected route
router.post('/',
    aurthMiddleware.authFoodPartnerMiddleware, 
    upload.single('Video'), 
    foodCountroller.createFood);

module.exports = router;