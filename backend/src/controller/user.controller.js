const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const genToken = require("../config/token");


const registerUserController = async(req,res)=>{
     try {
        const {userName, email , password } = req.body
        if(!userName||!email||!password){
        return res.status(404).json({message:"all feild is required"})
        }
     const isUserExist = await userModel.findOne({email})
     if(isUserExist) {
       return res.status(409).json({message:"user exist"})
     }
     const hashPassword = await bcrypt.hash(password,10);
     const user = await userModel.create({
      userName,
      email,
      password:hashPassword,
    
     })
  //  console.log(process.env.JWT_SECRETE);
   
   const token =await genToken(user._id)

     res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
       secure: false,
       maxAge: 7 * 24 * 60 * 60 * 1000
    });
 const { _id } = user;
// console.log(user);

return res.status(201).json({message:"user created successfuly",token,user: { _id, userName, email },})

     } catch (error) {
        console.log("error in registration",error);
            return res.status(500).json({ message: "Server Error", error: error.message });
        
     }
}

const loginUserController = async(req,res)=>{
   try {
      const {email,password} = req.body
 

      if(!email||!password){
        return res.status(404).json({message:"requied all field"})
      }
      const user = await userModel.findOne({email}).populate("listing", "title image1 image2 image3 rent city landmark category ");

      if(!user){
       return  res.status(404).json({message:"not registered user"})
      }
      const isMatch =await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(404).json({message:"password is wrong"})
      }

      const token = await genToken(user._id)
      res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
       secure: false,
        path: "/",
       maxAge: 7 * 24 * 60 * 60 * 1000
    });
    console.log(token);
    
     const { _id , userName } = user;
    //  console.log(user,email);
     
    return  res.status(201).json({message:"login succesfully",user: { _id, userName, email }})
      
   } catch (error) {
      console.log(error);
     return res.status(500).json({ message: "Server Error", error: error.message });
    
      
   }
   
}

const logoutUserController = async(req,res)=>{
try {
    const {token} = req.cookies;
 console.log(token);
 
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
     path: "/", 
  });
 return res.status(201).json({message:"logout success"})
} catch (error) {
  return res.status(409).json({message:"error in logout"}, error)
   
}
 
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}