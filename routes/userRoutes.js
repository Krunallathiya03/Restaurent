const express = require("express");
const { getUserController, 
        updateUserController, 
        updatePasswordController, 
        deleteUserController} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Get user
router.get("/getuser",authMiddleware,getUserController)

//update profile
router.put("/updateUser",authMiddleware,updateUserController)

//update password
router.post("/updatePassword",authMiddleware,updatePasswordController)

//delete user
router.delete("/deleteUser/:id",authMiddleware,deleteUserController)




module.exports = router;

