const mongoose = require("mongoose")

const listingModle = require("../model/listing.model");
const { raw } = require("express");


const userSchema = mongoose.Schema({
    userName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
 
    password:{
        required:true,
        type:String
    },
 
  listing : [{
    type:mongoose.Schema.ObjectId,
    ref:"Listing"
  }],
  booking:[{
    type:mongoose.Schema.ObjectId,
    ref:"Listing"
  }],
  
},{timestamps:true})


module.exports = mongoose.model("User" , userSchema)