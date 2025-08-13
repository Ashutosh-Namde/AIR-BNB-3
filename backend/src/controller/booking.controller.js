const listingModle = require("../model/listing.model");
const userModel = require("../model/user.model");
const Booking = require("../model/booking.model");

const createBooking = async (req,res) => {
   try {
     const {id}=req.params;
    const {checkIn,checkOut,totalRent} = req.body

    const listing = await listingModle.findById(id);

    if(!listing){
        return res.status(400).json({message:"listing is not found"})
    }

    if(new Date(checkIn)>= new Date(checkOut)){
        return res.status(400).json({message:"checkIn date should be less than checkOut date"})
    }

    if(listing.isBooked){
        return res.status(400).json({message:"listing is already booked"})
    }
    let booking = await Booking.create({
        checkIn,
        checkOut,
        totalRent,
        host:listing.host,
        guest:req.userId,
        listing:listing._id
})
booking = await booking.populate("host", "email") 
 
let user = await userModel.findByIdAndUpdate(req.userId,{
    $push:{booking:listing}
}, {new:true});
if(!user){
    return res.status(404).json({message:"user not found"})}

    listing.guest = req.userId
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json({message:"booking created successfully",booking})
   } catch (error) {
    console.log("error in createBooking", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
   }

}

const getBookingData = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.userId })
      .populate("listing") // listing ki details bhi chahiye
      .populate("host", "email"); // host ki basic info

    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    console.log("error in getBookingData", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const cancleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModle.findByIdAndUpdate(id, { isBooked: false }, { new: true });
        const user = await userModel.findByIdAndUpdate(req.userId, { $pull: { booking: id } }, { new: true });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        return res.status(200).json({ message: "Booking cancelled successfully", listing, user });
    }
    catch (error) {
        console.log("error in cancelBooking", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }

}
module.exports = {
    createBooking   ,
    cancleBooking,
    getBookingData
}
