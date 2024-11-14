const mongoose = require("mongoose")


const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connect thai gyo.....")
    }
    catch(error){
        console.log("Database connect nathi thyo....",error);
    }
}


module.exports = connectDb