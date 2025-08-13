import React, { useContext } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { BookingDataContext } from '../context/BookingContext'
import { commentContext } from '../context/comment'




const Booked = () => {

  const {bookingData} = useContext(BookingDataContext)
  const {handleAddComment,text,setText} = useContext(commentContext)

  
  
console.log(bookingData,"log");
console.log(bookingData.listing,"log");
console.log(text);
// console.log();




  return (
    <div className='h-full w-full gap-5 bg-gray-400 flex items-center justify-center flex-col'>
      <div className='h-[50%] w-[30%] bg-white flex  flex-col items-center justify-center'>
<GiConfirmed className=' flex items-center text-8xl  justify-center  text-green-700 '/>
 <h1 className='   text-green-700 bg-white p-1 text-2xl font-semibold rounded-lg'>
 Booking Confirmed</h1>

      
      <div className='w-full mt-10'>
        <div className='flex justify-between pl-5 mt-2 pr-5 w-full'>
          <h1>Booking Id:</h1>
          <h1>{bookingData._id}</h1>
        </div>
          <div className='flex justify-between pl-5 pr-5 mt-2 w-full'>
          <h1>Owner Details:</h1>
          <h1>{bookingData.host?.email}</h1>
        </div>
          <div className='flex justify-between pl-5 pr-5 mt-2 w-full'>
          <h1>Total Rent:</h1>
          <h1>{bookingData.totalRent}</h1>
        </div>
      </div>
    </div>

    {/* Reviews */}
     <div className='h-[30%] w-[40%] bg-white flex flex-col p-1'>
 <h1 className='text-2xl w-full flex justify-center '>Out Of 5 Rating</h1>

<input type="text" onChange={(e)=>{setText(e.target.value)}} value={text} />
<button onClick={()=>{handleAddComment(bookingData.listing)}}>submit</button>



    </div>
    </div>
  )
}

export default Booked