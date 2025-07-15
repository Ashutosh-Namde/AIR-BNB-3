const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        required:"true",
        type:String
    },
    email:{
        required:true,
        type:String
    },
    // phone:{
       
    //     type:Number
    // },
    password:{
        required:true,
        type:String
    },
    // address:{
       
    //     type:String
    // },
    // isAdmin:{
    //     Type:Boolean,
    //     default:false
    // }

})


module.exports = mongoose.model("user" , userSchema)