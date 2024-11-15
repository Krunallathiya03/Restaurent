const foodModel = require("../models/foodModel")
const orderModel = require("../models/orderModel")

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
       if(!title || !description || !price ||!restaurent)
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
        res.status(500).send({message:"Error in create food api",error})
    }

}

//get all food item
const getAllFoodController = async (req,res)=>{
    try{
        const foods = await foodModel.find();
        if(!foods)
            return res.status(404).send({message:"Fodd item not available"})

        res.status(200).send({totalfoods:foods.length,foods})
    }   
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in Get all food item Api...",error})
    }
}

//get food item by id
const getFoodItemByIdController = async (req,res) =>{
    try{
        const foodId = req.params.id;
        //validation
        if(!foodId)
            return res.status(404).send({message:"Please provide food id"})

        const food = await foodModel.findById(foodId)
        if(!food)
            return res.status(404).send({message:"Food not provide with this id"})

        res.status(200).send(food)

    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in Get Food by id API...."})
    }
}

//update food item
const updateFoodItemController = async (req,res) =>{
    try{
        const foodId = req.params.id
        if(!foodId)
            return res.status(404).send({message:"Food id is not available"})

        const food = await foodModel.findById(foodId)
        if(!food)
            return res.status(404).send({messaeg:"No food Found"})

        //update food item
        const updatefoodItem = await foodModel.findByIdAndUpdate(foodId,req.body,{new:true})
        res.status(200).send({message:"Updated food item",updatefoodItem})
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in update food item API....",error})
    }

}

//delete food item
const deleteFoodItemcontroller = async (req,res) =>{
    try{
        const foodId = req.params.id
        if(!foodId)
            return res.status(404).send({message:"Provide food id"})

        const food = await foodModel.findById(foodId)
        if(!food)
            return res.status(404).send({messaeg:"no food with this id"})

        //delete food item
        const deletefoodItem = await foodModel.findByIdAndDelete(foodId)
        //console.log("kadhi nakhiu")
        res.status(200).send({messaeg:"Food item Delete",deletefoodItem})
    }
    catch(error){
        console.log(error)
        res.status(500).send({messaeg:"Error in delete food item api....",error})
    }
}

//Place order
const placeOrderController = async (req,res)=>{
    try{
        const {cart} = req.body
        if(!cart)
            return res.status(400).send({message:"Add to cart...."})

        //calculation
        let total = 0;
        cart.map((item) =>{
            total += item.price
        })

        const order = new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await order.save();

        res.status(201).send({messaeg:"order placed sucessfully...",order})



    }
    catch(error){
        console.log(error)
        res.status(500).send({messaeg:"Error in Place order API....."})
    }
}



module.exports = {createFoodController,
                  getAllFoodController,
                  getFoodItemByIdController,
                  updateFoodItemController,
                  deleteFoodItemcontroller,
                  placeOrderController
                  

}