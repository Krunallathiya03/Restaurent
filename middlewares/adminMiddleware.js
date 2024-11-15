const userModel = require("../models/userModel")

module.exports  = async (req,res,next)=>{
    try{
        const user = await userModel.findById(req.body.id)
        if(user.usertpe !== "admin")
            return res.status(401).send({message:"only admin access"})
        else{
            next();
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"un-authorised access"})
    }
}