const JWT = require("jsonwebtoken")

module.exports = async(req,res,next) => {
    try{
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({message:"Unauthorize User"})
            }
            else{
                req.body.id = decode.id
                next();
            }
        })
    }
    catch(error){
        res.status(500).send("Error in middleware api...",error)
    }
}