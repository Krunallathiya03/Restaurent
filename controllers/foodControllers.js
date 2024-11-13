const foodModel = require("../models/foodModel")

//create food
const createFoodController =  async (req,res) =>{
    try{

        const { title,
       description,
       price,
       imgUrl,
       foodTag,
       code,
       isAvailable,
       restaurent,
       rating,
       ratingcount
    } = req.body
    
       //validation
       if(!title || !description || !price || !reataurent)
           return res.status(400).send({message:"Please provide all fields"})
    
       const food = new foodModel({title,
           description,
           price,
           imgUrl,
           foodTag,
           code,
           isAvailable,
           restaurent,
           rating,
           ratingcount});
           
           await food.save();
           res.status(200).send({message:"Food item is created",food})
    }

    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in create food api"},error)
    }

}

module.exports = {createFoodController}