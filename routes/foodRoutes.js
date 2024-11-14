const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, 
        getAllFoodController, 
        getFoodItemByIdController,
        updateFoodItemController,
        deleteFoodItemcontroller,
        placeOrderController} = require('../controllers/foodControllers');


const router = express.Router();

//create food
router.post('/create',authMiddleware,createFoodController)

//get all food items
router.get('/getall',getAllFoodController)

//get food item by id
router.get("/get/:id",getFoodItemByIdController)

//update food item
router.put("/update/:id",authMiddleware,updateFoodItemController)

//delete food item
router.delete("/delete/:id",authMiddleware,deleteFoodItemcontroller)

//placeorder
router.post("/placeorder",authMiddleware,placeOrderController)





module.exports = router