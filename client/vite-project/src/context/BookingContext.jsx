import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { listingDataContext } from './ListingContext';

export const BookingDataContext = createContext();

const BookingContext = ({ children }) => {

  const [checkIn, setcheckIn] = useState("")
  const [checkOut, setcheckOut] = useState("")
  const [total, settotal] = useState(0)
  const [night, setnight] = useState(0)
    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    const {handleGetAllListing} = useContext(listingDataContext);
   const [bookingData, setbookingData] = useState([])
   const [currentBooking, setCurrentBooking] = useState(null);

  const handleBooking =async (id)=>{

    try {
      const result = await axios.post(serverUrl + `/booking/add/${id}`, 
        {checkIn, checkOut, totalRent:total},
        { withCredentials: true }
    )
    await getCurrentUser()
    await handleGetAllListing()
setCurrentBooking(result.data.booking);
    console.log("Booking created successfully:", result.data);
    } catch (error) {
  console.log("Error in booking:", error?.response?.data || error.message);
  setbookingData(null);
}
  }
  
   const handleCancelBooking =async (id)=>{

    try {
      const result = await axios.delete(serverUrl + `/booking/cancle/${id}`, 
        { withCredentials: true }
    )
    await getCurrentUser()
    await handleGetAllListing()

    console.log("Booking created successfully:", result.data);
    } catch (error) {
  console.log("Error in booking:", error?.response?.data || error.message);
  setbookingData(null);
}
  }

  const getMyBookings = async () => {
  try {
    const res = await axios.get(serverUrl + "/booking/my", {
      withCredentials: true,
    });
    setbookingData(res.data.bookings);
        console.log("Raw response from /booking/my:", res.data)
    console.log("Bookings fetched:", res.data.bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }
};

useEffect(() => {
  getMyBookings();
}, []);

  

  const value = {
    checkIn,
    setcheckIn, 
    checkOut,
    setcheckOut,
    total,
    settotal,
    night,      
    setnight, 
    bookingData,
    setbookingData,
    handleBooking,
    handleCancelBooking,
    getMyBookings,
    currentBooking,
    setCurrentBooking
  }

  return (
    <BookingDataContext.Provider value={value}>
      {children}
    </BookingDataContext.Provider>
  )
}

export default BookingContext
