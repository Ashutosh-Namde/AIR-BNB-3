const userModel = require("../model/user.model")

const getCurrentUser = async(req,res)=>{

   try {
     const user = await userModel.findById(req.userId).select("-password")

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