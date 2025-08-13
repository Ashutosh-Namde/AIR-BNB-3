const userModel = require("../model/user.model")
const Listing = require("../model/listing.model"); 

const getCurrentUser = async(req,res)=>{

   try {
     const user = await userModel.findById(req.userId).select("-password").populate("listing", "title image1 image2 image3 rent city landmark category rating isBooked guest host")
     .populate("booking", "title image1 image2 image3 rent city landmark category rating isBooked guest host")

    if(!user){
       return res.status(400).json({message:"user not found"})
    }

    res.status(200).json(user)
    console.log(user);
    
   } catch (error) {
     return   res.status(409).json({message:`getCurrentUser error ${error}`})
    
   }
}


module.exports = {
    getCurrentUser
}