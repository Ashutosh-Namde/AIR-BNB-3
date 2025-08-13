/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react'
import { FaStar } from 'react-icons/fa6'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { IoMdStar } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { BookingDataContext } from '../context/BookingContext'


const Card = ({image1,image2,image3,rent,id,city,landmark,title,rating,isBooked,host}) => {

  const {userData} = useContext(userDataContext)
const {viewCardHandler} = useContext(listingDataContext)
const {cardData} = useContext(listingDataContext)
const [canclePopup, setCanclePopup] = useState(false)
const {handleCancelBooking} = useContext(BookingDataContext)

const navigate = useNavigate()

  const handleCardClick = async () => {
    
    try {
      if(userData) {
        await viewCardHandler(id);
        navigate("/viewcard")
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error viewing card details:", error);
    }
  }
// console.log(userData?._id, "userData in Card component");
// console.log("Host ID:", host.toString());


  return (
    
    
    <div onClick={() => !isBooked && handleCardClick()} className='w-[300px] max-w-[85%] h-[400px] flex items-start  justify-start  flex-col rounded-lg cursor-pointer relative '>
      {
        isBooked &&
        <h1 className='absolute flex items-center justify-center gap-1 right-1 top-1 text-green-600 bg-white p-1 rounded-lg'><GiConfirmed />
 Booked</h1>
      }
    {isBooked  && userData?._id === host.toString()  &&
    <h1 onClick={() => setCanclePopup(prev => !prev)}
     className
    ='absolute flex items-center justify-center gap-1 right-1 top-10 text-red-600 bg-white p-1 rounded-lg'>
 <MdCancel />
Cancel Booking!</h1>}

{
  canclePopup && <div className='w-[90%] h-[25%] top-[110px] left-[13px] absolute  bg-white rounded-t-lg shadow-lg'>
<div className='w-[100%] h-[50%] flex  items-center justify-center text-[20px] font-semibold'>
 Booking   Cancel!
</div>
<div className='w-[100%] h-[100%]  ml-5 items-center justify-center  '>
  Are you sure ?
  <button onClick={()=>{handleCancelBooking(id); setCanclePopup(prev => !prev)}} className='ml-5 rounded-lg px-3 text-white hover:bg-gray-600 bg-red-500'>Yes</button>
<button  onClick={() => setCanclePopup(prev => !prev)} className='ml-5 rounded-lg px-3 text-white hover:bg-gray-600 bg-red-500'>No</button>
</div>

</div>
}
      <div className='w-[100%] h-[67%] rounded-lg scrollbar-hide  overflow-auto flex'>
            <img src={image1} className='flex-shrink-0 w-[100%]' alt="" />
            <img src={image2} alt="" className='flex-shrink-0 w-[100%]'/>
            <img src={image3} alt="" className='flex-shrink-0 w-[100%]'/>
      </div>
        <div className=' w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
                <div className='flex items-center justify-between text-[18px] '>
                  <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()},{city.toUpperCase()}</span>
                    <span className='flex items-center justify-center gap-[5px]'><IoMdStar className='text-[#eb6262]' />{rating}</span>
                </div>
                <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>{title.toUpperCase()} </span>
                <span className='text-[16px] font-semibold text-[#986b6b]'>₹{rent}/day</span>
             
         </div>
    </div>
  
  )
}

export default Card