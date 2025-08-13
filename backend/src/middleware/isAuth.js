  const jwt = require("jsonwebtoken")

  const isAuth = (req,res,next)=>{

      try {
          const {token} = req.cookies
      if(!token){
        return res.status(409).json({message:"user dont have a token"})
      }
      const verifyToken = jwt.verify(token,"qwertyuio123")
      console.log(verifyToken+"token");
      

      if(!verifyToken){
        return res.status(409).json({message:"invalid token"})
      }
    req.userId = verifyToken.userId
    
    

    next();
  }

      catch (error) {
        return  res.status(404).json({message:`is Auth Error ${error}`})
      
      
      }
  }


  module.exports = {
      isAuth
  }