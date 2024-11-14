const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        price:{
            type:Number,
            required:true
        },

        imgUrl:{
            type:String,
            default:"category.png"
        },
 
        foodTag:{
            type:String
        },

       code:{
        type:String
       },

       isAvailable:{
        type:Boolean,
        default:true
       },

    //    restaurent:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'Restaurent'
    //    },

       rating:{
        type:Number,
        default:5,
        min:1,
        max:5
       },

       ratingcount:{
        type:String
       }



},{timestamps:true})


module.exports = mongoose.model("Food",foodSchema)