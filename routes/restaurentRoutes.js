const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createrestaurentController,  
        getRestaurentbyIdController,
        getAllRestaurentController,
        deleterestaurentController} = require("../controllers/restaurentControllers");

const router = express.Router();

//create restaurent
router.post("/create",authMiddleware,createrestaurentController);

//get all restaurent
router.get("/getall",getAllRestaurentController);

// get id restaaurent
router.get("/get/:id",getRestaurentbyIdController);

//delete restaurent
router.delete("/delete/:id",authMiddleware,deleterestaurentController)


module.exports = router;