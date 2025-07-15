const jwt = require("jsonwebtoken")

const genToken  = (userId)=>{
    try {
        let token = jwt.sign({userId},process.env.JWT_SECRETE,{expiresIn:"7d"})
        return token;
    } catch (error) {
        console.log("token error");
        
    }
}

module.exports = genToken