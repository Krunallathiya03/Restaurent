const restaurentModel = require("../models/restaurentModel");

const createrestaurentController = async(req,res) =>{
    try{    
        const{title,
            imageUrl,
            foods = [],
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            address
         } = req.body;

         // validation

         if(!title || !address){
            return res.status(500).send({message:"please provide title and addrss"})
         }

    // create new restaurent
    const newRestaurent = await restaurentModel({
        title,
        imageUrl, 
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        address
    });

    await newRestaurent.save();
    res.status(201).send({
        message: "New restaurent created successfully",newRestaurent
        
    });
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error in creating restaurent api...",error)

    }
}

//get all restaurent
const getAllRestaurentController = async(req,res)=>{
    try{
        const restaurent = await restaurentModel.find()
        if(!restaurent)
            return res.status(404).send({message:"restaurent not found"})

        res.status(200).send({totalRestaurent:restaurent.length,restaurent})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in get all restaurent api...",error})
    }
}

//get byid restaurent
const getRestaurentbyIdController = async(req,res) =>{
    try{
        const restaurentId = req.params.id;
        if(!restaurentId)
            return res.status(404).send({message:"please provide restaurent id"})

        //find restaurent
        const restaurent = await restaurentModel.findById(restaurentId)
        if(!restaurent)
            return res.status(404).send({message:"restaurent not found"})

        res.status(200).send(restaurent)
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"error in get all retaurent by id api....",error})
    }
}

//delete restaurent
const deleterestaurentController = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id)
            return res.status(404).send({message:"restaurent not found"});

        const deleteRestaurent = await restaurentModel.findByIdAndDelete(id)
        res.status(200).send({message:"Restaurent deleted sucessfully...",deleteRestaurent})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Error in delete restaurent api....",error})
    }
}

module.exports = {createrestaurentController,
                  getRestaurentbyIdController,
                  getAllRestaurentController,
                  deleterestaurentController
}