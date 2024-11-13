const categoryModel = require("../models/categoryModel")


const createCategoryController = async (req,res) => {
    try{
        const {title,imgUrl} = req.body

        //validation
        if(!title){
            return res.status(500).send({message:"Please provide category title and image"})
        }

        const newCategory = categoryModel({title})
        await newCategory.save()
        res.status(201).send({message:"category crerated",newCategory})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in create category api...",error})
    }
};

//get all category

const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        
        if (!categories) {
            return res.status(404).send({ message: "No category found" });
        }

        res.status(200).send({
            total_categories: categories.length,
            categories: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in getAllCategory API", error });
    }
};

//update category
const updateCategoryController = async(req,res) => {
    try{
        const{title,imgUrl} = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(req.params.id,{title,imgUrl},{new:true})
        if(!updateCategory)
            return res.status(500).send({message:"no category found..."})

        res.status(200).send({message:"category updated sucessfully....",updateCategory})
    }   
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in Update Category API....",error})
    }
}

//delete category
const deleteCategoryController = async(req,res)=>{
    try{

        const { id } = req.params;
        //find category
        const  category = await categoryModel.findById(id)
        if(!category)
            return res.status(500).send({message:"Category not found..."})

        //delete category
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({message:"Category deleted sucessfully",deleteCategory})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in delete category API....",error})
    }

}

module.exports = {createCategoryController,
                  getAllCategoryController,
                  updateCategoryController,
                  deleteCategoryController,
                }