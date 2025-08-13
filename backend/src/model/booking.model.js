const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    host:{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    guest:{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },

    listing:{
        ref: "Listing",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum: ["booked", "cancel"],
        default: "booked"
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        required: true
    },
    totalRent:{
        type: Number,
        required: true
    }
}, {timestamps: true});


const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;