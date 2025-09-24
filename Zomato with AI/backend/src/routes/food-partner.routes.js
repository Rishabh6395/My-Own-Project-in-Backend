const express = require('express');
const router = express.Router();
const authUserMiddleware = require('../middlewares/auth.middleware');
const foodPatnerController = require('../controllers/food-partner.controller');

router.get('/:id',
    authUserMiddleware.authUserMiddleware,
    foodPatnerController.getFoodPartnerById
)

module.exports = router;