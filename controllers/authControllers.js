const bcrypt =require("bcrypt");
const JWT =  require("jsonwebtoken");
const userModel = require("../models/userModel");

// <-----------------------------------register------------------------------>
const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body
        //validation
        if (!username || !email || !password || !address || !phone) {
            return res.status(400).send({ message: "Please provide all fields" })
        }

        //check user
        const exisitinguser = await userModel.findOne({ email })
        if (exisitinguser) {
            return res.status(400).send({ message: "You are already registered please login..." })
        }

        //hasing password
         const hash = await bcrypt.hash(password ,10);

        //create user
        const user = await userModel.create({
            username,
            email,
            password: hash,
            address,
            phone,
        })
        await user.save();
        res.status(201).send({ message: "sucessfully registered.........", user })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "error in Register API", error
        })
    }
}

//<---------------------------------Login---------------------------------------------->
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password)
            return res.status(400).send({ message: "Email and password are required...." });

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: "User not found..." })
        }
       // res.status(200).send({ message: "login successfully.....", user });

        //compare password | check user password
        const ismatch = await bcrypt.compare(password , user.password);
        if(!ismatch){
            return res.status(400).send({message:"Your password are not matched"});
        }
        //token
        const token = JWT.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        res.status(200).send({message:"login sucessfully....",token,user})
    }
        
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in login api....", error})

    }
}




module.exports = { registerController, loginController }     