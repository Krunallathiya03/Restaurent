const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createrestaurentController } = require("../controllers/restaurentControllers");

const router = express.Router();

//create restaurent
router.post("/create",authMiddleware,createrestaurentController)




module.exports = router;