const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        required:"true",
        Type:String
    },
    email:{
        required:"true",
        Type:String
    },
    phone:{
        required:"true",
        Type:Number
    },
    password:{
        required:"true",
        Type:String
    },
    address:{
        required:"true",
        Type:String
    },
    // isAdmin:{
    //     Type:Boolean,
    //     default:false
    // }

})


module.exports = mongoose.model("user" , userSchema)