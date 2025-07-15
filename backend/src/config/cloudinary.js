const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadCloudinary = async(filepath)=>{
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
    });
    try {
        if(!filepath){
            return null;
        }
        const uploadResult = await cloudinary.uploader
       .upload(filepath)
       fs.unlinkSync(filepath)
       return uploadResult.secure_url

      
    }
     catch(error)  {
        fs.unlinkSync(filepath)
           console.log(error);
       };
}

module.exports  =uploadCloudinary;