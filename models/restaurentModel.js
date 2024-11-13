const mongoose = require("mongoose");


const restaurentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{ 
        type:String,
    },
    foods:{
        type:Array,
        default:[]
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
        default:0
    },
    address:{
        type:String,
    }
                     
},{timestamps:true})

module.exports = mongoose.model("Restaurent",restaurentSchema)