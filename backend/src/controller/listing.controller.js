const listingModle = require("../model/listing.model");
const userModel = require("../model/user.model");
const uploadCloudinary = require("../config/cloudinary");

const addListing = async(req,res)=>{
    try {
        const host = req.userId;
        const {title , description , rent ,city ,landmark , category} = req.body

        if(!title || !description || !rent || !city || !landmark || !category){
            return res.status(400).json({message:"All fields are required"})
        }
               if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
    return res.status(400).json({ message: "All three images are required" });
}
  
        let image1 = await uploadCloudinary(req.files.image1[0].path);
        let image2 = await uploadCloudinary(req.files.image2[0].path);
        let image3 = await uploadCloudinary(req.files.image3[0].path);

       

        const listing = await listingModle.create({
            title , description , rent ,city ,landmark , category,
            image1,
            image2,
            image3,
            host
        })

        const user = await userModel.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true});

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(201).json(listing)
    } catch (error) {
        return res.status(500).json({message:`AddListing error ${error}`})
        
    }
}

const getAllListing = async(req,res)=>{
    try {
        const listings = await listingModle.find().sort({createdAt:-1});
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json({message:`GetAllListing error ${error}`})
    }
}

module.exports = {
    addListing,
    getAllListing
};