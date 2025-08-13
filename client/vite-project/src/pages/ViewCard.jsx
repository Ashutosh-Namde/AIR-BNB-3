import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';
import { FaArrowCircleLeft } from "react-icons/fa";

import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { IoMdStar } from 'react-icons/io';
import { BookingDataContext } from '../context/BookingContext';
import { commentContext } from '../context/comment';

const ViewCard = () => {
    const navigate = useNavigate();
    const {userData} = useContext(userDataContext);
    const {cardData , setcardData} = useContext(listingDataContext);
    const [updatePopup, setupdatePopup] = useState(false)
    const [bookingPopup, setbookingPopup] = useState(false)
    // console.log(JSON.stringify(cardData) + " cardData");
    const {serverUrl} = useContext(authDataContext)
    const [title, settitle] = useState(cardData.title)
    const [description, setdescription] = useState(cardData.description)
    const [rent, setrent] = useState(cardData.rent)
    const [city, setcity] = useState(cardData.city)
    const [landmark, setlandmark] = useState(cardData.landmark)
    const [category, setcategory] = useState(cardData.category) 
    const [backendImage1, setbackendImage1] = useState(null)  
    const [backendImage2, setbackendImage2] = useState(null)  
    const [backendImage3, setbackendImage3] = useState(null) 
    const [minDate, setminDate] = useState() 
    const {update , setUpdate} = useContext(listingDataContext)
    const {deleted, setDeleted} = useContext(listingDataContext)
    const {  checkIn,
    setcheckIn, 
    checkOut,
    setcheckOut,
    total,
    settotal,
    night,      
    setnight} = useContext(BookingDataContext)
    const {handleBooking} = useContext(BookingDataContext)

   const { comments , setComments, fetchComments , loading, setLoading } = useContext(commentContext);
   const {bookingData} = useContext(BookingDataContext)


 useEffect(() => {
  fetchComments(bookingData[1].listing._id); // now this works properly
 console.log(bookingData,"bokking");
  

  if (!checkIn || !checkOut) {
    setnight(0);
    settotal(0);
    return;
  }

  if (cardData && cardData.rent) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const n = (outDate - inDate) / (24 * 60 * 60 * 1000);
    setnight(n);

    let airbnbCharge = cardData.rent * 5 / 100;
    let tax = cardData.rent * 8 / 100;

    if (n > 0) {
      settotal((n * cardData.rent) + airbnbCharge + tax);
    } else {
      settotal(0);
    }
  }

 
}, [checkIn, checkOut, cardData.rent]);

// ✅ Move this function outside the useEffect
 // eslint-disable-next-line no-const-assign
//  const fetchComments = async (listingId) => {
//   try {
//     const res = await axios.get(`${serverUrl}/comment/get/${listingId}`);
//     setComments(res.data.comments);
//     console.log("fetch data", res.data);
//   } catch (err) {
//     console.error("Error loading comments:", err.response?.data || err.message);
//   } finally {
//     setLoading(false);
//   }
// };



    const handleUpdateListing = async () => {
        setUpdate(true)
        console.log("Adding Listing")
        try {
           setUpdate(false)
            let formData = new FormData()
     formData.append("title",title)
    if(backendImage1){ formData.append("image1",backendImage1)}
    if(backendImage2) {formData.append("image2",backendImage2)}
    if(backendImage3) {formData.append("image3",backendImage3)}
     formData.append("description",description)
     formData.append("rent",rent)
     formData.append("city",city)
     formData.append("landmark",landmark)
     formData.append("category",category)
        
        let result = await axios.post( serverUrl + `/listing/update/${cardData._id}` ,formData, {withCredentials:true}  )
     console.log(" update listing:", result.data);
      setupdatePopup(prev => !prev) ,
      setUpdate(false)

        navigate("/")
        // toast.success("AddListing Successfully")
        settitle("")
        setdescription("")
      //  setfrontendImage1(null)
      //  setfrontendImage2(null)
      //  setfrontendImage3(null)
       setbackendImage1(null)
       setbackendImage2(null)
       setbackendImage3(null)
       setrent("")
       setcity("")
       setlandmark("")
       setcategory("")
            
        } catch (error) {
     setUpdate(false)
  console.log(" Error message:", error.response?.data?.message || error.message);
}
        
     }

      const handleImage1 = (e) => {
    const file = e.target.files[0];
    setbackendImage1(file);
    // setfrontendImage1(URL.createObjectURL(file));

  };
   const handleImage2 = (e) => {
    const file = e.target.files[0];
    setbackendImage2(file);
    // setfrontendImage2(URL.createObjectURL(file));

  };
   const handleImage3 = (e) => {
    const file = e.target.files[0];
    setbackendImage3(file);
    // setfrontendImage3(URL.createObjectURL(file));

  };
    
  const handleDeleteListing = async () => {
    setDeleted(true)
  try {
    const result = await axios.delete(serverUrl + `/listing/delete/${cardData._id}`, { withCredentials: true });
    console.log("Listing deleted:", result.data);
    setDeleted(false);
    navigate("/");

  } catch (error) {
    setDeleted(false);
    console.log("Error deleting listing:", error.response?.data?.message || error.message);
  }
  }
   
  useEffect(() => {
    let today = new Date().toISOString().split('T')[0];
    setminDate(today);
  },[])
  return (
    <div className='w-[100%] min-h-screen bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto  relative'>
       <div className='w-[100%] min-h-screen bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto  relative'>
             <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
    
             <div className='w-[95%]  flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className='text-[20px]  text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]'>
                    {`In ${cardData.landmark.toUpperCase()} , ${cardData.city.toUpperCase()}`}
                </h1>
             </div>
    
             <div className='w-[95%] h-[400px] flex items-center mt-[-15px] justify-center flex-col md:w-[80%] md:flex-row '>
                <div className='w-[100%]  h-[65%]  md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white] '>
                    <img src={cardData.image1} alt="" className='w-[100%]' />
                </div>
                <div className='w-[100%] h-[50%]  flex  items-center justify-center md:w-[50%] md:h-[100%] md:flex-col '>
                    <div className='w-[100%] h-[100%]  overflow-hidden  flex items-center justify-center border-[2px] '>
                    <img src={cardData.image2} alt="" className='w-[100%]' />
                    </div>
                    <div className='w-[100%] h-[100%]  overflow-hidden  flex items-center justify-center border-[2px] '>
                    <img src={cardData.image3} alt="" className='w-[100%]' />
                    </div>
                </div>
               
             </div>
             <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${cardData.title.toUpperCase()} ${cardData.category.toUpperCase()} , ${cardData.landmark.toUpperCase()}`}</div>
             <div className='w-[95%] flex mt-[-10px] items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>{`${cardData.description.toUpperCase()}`}</div>
             <div className='w-[95%] flex items-start mt-[-10px] justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`Rs.${cardData.rent}/day`}</div>
    
             <div className='w-[95%] h-[50px] flex items-center justify-start px-[110px]' >
              {userData._id == cardData.host &&
              <button onClick={()=>{setupdatePopup(prev => !prev)}} className='px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap '  > 
              Editing
             </button>}
              {userData._id != cardData.host &&
              <button  onClick={()=>{setbookingPopup(prev => !prev)}} className='px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap '  > 
              Booking
             </button>} 
             
             </div>
        </div>
        
        {/* update listing */}
       

       {
        updatePopup &&  
 <div className='absolute  h-screen w-full backdrop-blur-sm  bg-black/20 z-[100] flex items-center justify-center'>
<div className="min-h-screen w-full flex items-center justify-center  relative">
      <FaArrowCircleLeft
        className="text-4xl text-red-700 absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      />

  
      <div className="absolute top-6 right-6 bg-red-600 text-white py-2 px-5 rounded-xl shadow-md  font-semibold">
        Set Up Your Home
      </div>


      <form onSubmit={(e)=>{e.preventDefault()} } className="bg-white shadow-xl overflow-auto rounded-2xl p-8 w-[90%] h-[90vh]  max-w-2xl space-y-5 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Welcome to Airbnb
        </h1>

        <div className="space-y-2">
          <label className="font-medium required:">Title</label>
          <input
            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Your listing title"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded-md resize-none focus:outline-none focus:ring focus:ring-red-300"
            rows={3}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Describe your property..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-medium">Rent (per day)</label>
            <input
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
              value={rent}
              onChange={(e) => setrent(e.target.value)}
              type="text"
              placeholder="e.g., ₹1500"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">City</label>
            <input
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              type="text"
              placeholder="City name"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Landmark</label>
            <input
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
              value={landmark}
              onChange={(e) => setlandmark(e.target.value)}
              type="text"
              placeholder="Nearby landmark"
            />
          </div>

        </div>

        {/* Image Uploads */}
        <div className="space-y-2">
          <label className="font-medium">Image 1</label>
          <input
            type="file"
            className="w-full border p-2 rounded-md"
            onChange={handleImage1}
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Image 2</label>
          <input
            type="file"
            className="w-full border p-2 rounded-md"
            onChange={handleImage2}
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Image 3</label>
          <input
            type="file"
            className="w-full border p-2 rounded-md"
          onChange={handleImage3}
          />
        </div>

        <div className="flex justify-center">
          <button
          
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md"
            onClick={()=>{
            
              handleUpdateListing(); 
             
            }} 
            disabled={update}
          >
            {update ? "Updating..." : "Update Listing"}
          </button>
           <button
          
            className="bg-red-600  hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md"
            onClick={()=>{
            
              handleDeleteListing(); 
             
            }} 
            // disabled={}
          >
           {deleted ? "Deleting..." : "Delete Listing"}
          </button>
        </div>
      </form>
    </div>

        </div>
        
       }



       {/* booking structre */}

       {bookingPopup && 
 <div className='absolute  h-screen w-full backdrop-blur-sm  bg-white/20 z-[100] flex items-center justify-center'>
       <div className="min-h-screen w-full flex items-center  justify-center gap-20  relative">
      <FaArrowCircleLeft
        className="text-4xl text-red-700 absolute top-6 left-6 cursor-pointer"
        onClick={() => setbookingPopup(prev => !prev  )}
      />

  <form action="" onSubmit={(e)=>{e.preventDefault()}} className='bg-white flex-col shadow-xl overflow-auto rounded-2xl p-8 w-[450px] h-[450px] flex items-start justify-start max-w-2xl space-y-5 border border-gray-200'>
        <h1 className='text-2xl border-b  border-gray-400 shadow-xl pb-3  w-full flex justify-center'>Book Your Stay</h1>
          <h1 className='text-lg font-medium'>Your Trip - </h1>
      
        <div className='w-[100%] flex flex-col  items-center justify-start gap-[40px] px-10'>
         <div>
           <label htmlFor=""  className='mt-1 text-start'>CheckIn</label>
          <input type="date" onChange={(e)=>{setcheckIn(e.target.value)}} value={checkIn} min={minDate} className=' border border-gray-400 ml-5 p-1 rounded-xl  px-2' />
      
         </div>
      <div><label htmlFor=""  className='mt-1'>CheckOut</label>
          <input type="date"  onChange={(e)=>{setcheckOut(e.target.value)}} value={checkOut} min={minDate} className=' border border-gray-400 ml-5 p-1 rounded-xl  px-2' />
     </div>
     <button onClick={()=>{handleBooking(cardData._id); navigate("/booked")}}   className='px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap '  > 
              Book Now
             </button>
        </div>
</form>

        
   <form action="" onSubmit={(e)=>{e.preventDefault()}} className='bg-white  flex-col shadow-xl overflow-auto rounded-2xl p-8 w-[450px] h-[450px] flex items-start justify-center max-w-2xl space-y-2 border border-gray-200'>
        <div className='w-[100%] flex rounded-xl items-center justify-start p-1 h-30 border border-gray-500 shadow-2xl'>
                  <img src={cardData.image3} className='h-28 ' alt="" />
                  <div className='ml-5'>
                    <h1 className=''>{cardData.title.toUpperCase()}</h1>
                    <h1 className=''>{cardData.description.toUpperCase()}</h1>
                    <h1 className=''>{cardData.category.toUpperCase()}</h1>
                    <h1 className='flex items-center gap-1 '><IoMdStar/>{cardData.rating}</h1>
                    
                  </div>
        </div>
        <div className='w-[100%] h-full rounded-xl flex items-center justify-start border-gray-500 p-1 shadow-2xl border'>
          <div className='w-[100%] h-full flex p-5 items-start justify-start flex-col'>
            <h1 className='text-lg font-medium'>Booking Price -</h1>
            <div className='w-[100%] flex items-center justify-between px-6 py-2'>
              <span>{`${cardData.rent} x ${night} nights`}</span>
              <span>{cardData.rent*night}</span>
            </div>
            <div className='w-[100%] flex items-center justify-between px-6 py-2'>
              <span>Tax</span>
              <span>{cardData.rent*8/100}</span>
            </div>
            <div className='w-[100%] border-b shadow-xl flex items-center justify-between px-6 py-2'>
              <span>Airbnb Charge</span>
              <span>{cardData.rent*5/100}</span>
            </div>
            <div className='w-[100%] flex items-center mt-2 justify-between px-6 py-2'>
              <span>Total</span>
              <span className='font-semibold'>{total}</span>
          </div>
          </div>

        </div>
</form>
   
      </div>
       </div> } 
       <div className='h-[40vh] w-[40vw] bg-gray-400 flex'>
        <h1 className='text-2xl font-semibold flex  justify-center w-full'>Reviews</h1>
 {loading ? (
        <p className="text-white text-center">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-white text-center">No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="bg-white p-3 rounded mb-2 shadow">
            <p className="text-gray-800">
              <span className="font-semibold">{c.user?.name || "Anonymous"}:</span> {c.text}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
       </div>
        </div>
  )
}

export default ViewCard