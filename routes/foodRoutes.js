const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController } = require('../controllers/foodControllers');


const router = express.Router();

//create food
router.post('/create',authMiddleware,createFoodController)



module.exports = router