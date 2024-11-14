const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    foods:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Food"
        }
    ],
    payment:{},

    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    


},{timestamps:true})


module.exports = mongoose.model("order",orderSchema)