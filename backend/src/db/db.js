const mongoose = require("mongoose")

async function connectDB(){
    try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AIRBNBNEW")
        console.log("DB connected");
        
    } catch (error) {
        console.log("error in connect db" , error);
        
    }
}

module.exports=connectDB