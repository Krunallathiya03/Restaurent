const expresss = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, 
        getAllCategoryController,
        updateCategoryController,
        deleteCategoryController} = require('../controllers/categoryControllers');


const router = expresss.Router();

//routes
//create category
router.post('/create',authMiddleware,createCategoryController)

//get all category
router.get('/getAll',getAllCategoryController)

//Update category
router.put('/updateCategory/:id',authMiddleware,updateCategoryController)

//delete category
router.delete('/delete/:id',authMiddleware,deleteCategoryController)

module.exports = router