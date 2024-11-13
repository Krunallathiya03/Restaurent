const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:Array,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    usertype:{
        type:String,
        require:true,
        default:'clinet',
        enum:['clinet','admin','vender','driver']
    },
    profile:{
        type:String,
        default:"default.png"
    }
},{timestamps:true})


module.exports = mongoose.model('User',userSchema)