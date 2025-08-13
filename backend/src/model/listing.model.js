const mongoose  = require("mongoose")
const userModel = require("./user.model")

const listingSchema = mongoose.Schema({
     
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
      guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
     rating:{
        type:Number,
        default: 0,
        min: 0,
        max: 5
      } 
},{timestamps:true})

const listingModle = mongoose.model("Listing" , listingSchema)

module.exports = listingModle