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
    const newRestaurent = await restaurentModel.create({
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
        message: "New restaurent created successfully",
        
    });
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error in creating restaurent api...",error)

    }
}

module.exports = {createrestaurentController}