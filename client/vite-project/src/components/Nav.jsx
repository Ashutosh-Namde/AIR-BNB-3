import React from 'react'
import { IoMenu } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";

import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';


const Nav = () => {

    const [menu, setmenu] = useState(false)
   const navigate = useNavigate()
   const {serverUrl} = useContext(authDataContext)
    const {userData , setuserData} = useContext(userDataContext)
    const [cate, setcate] = useState("")
    const {listingdata, setlistingdata , newlistData , setnewlistData} = useContext(listingDataContext)

   const handleLogout = async()=>{
    try {
        const result = await axios.get(serverUrl + "/auth/logout",{
            withCredentials:true
        })

        console.log(result.data.message);
        setuserData(null)
        console.log("logout");
        
    //      localStorage.removeItem("user");
    // localStorage.removeItem("token");
        
    } catch (error) {
        console.log(error.response.data.message);
        
    }
   }

   const handleCategory = (category) => {
    console.log("Selected category:", category);
    console.log(newlistData);
    console.log(listingdata);
    
    // console.log(newlistData.map(item => item.category));
    
   setcate(category);
   if(category === "Trending") {
    setnewlistData(listingdata)
   }
   else {
   setnewlistData(listingdata.filter((item) => item.category === category));
   }

}

  
  return (
    <div className='fixed top-0 z-50 bg-white w-full shadow-md'>
    <div className='h-24   w-full border-b-1 border-gray-300 flex  justify-between items-center p-8'>
        
        <img className='h-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png" alt="" />
         
<div className='flex   items-center relative '>
         <input className='w-96 p-3 rounded-3xl  border border-gray-400' type="text" placeholder='Any Where  |  Any Location   |  Any City' />
<IoIosSearch  className='absolute right-4 border rounded-full text-2xl bg-red-500 text-white '/>
</div>

         
         <div className='flex gap-4'>
            <h1 className='cursor-pointer hover:bg-[#F7F9FB]  p-1 rounded-3xl px-2 ' onClick={()=>{navigate("/listing")}}>List the property</h1>
            <button onClick={()=>setmenu(prev => !prev)} className='flex gap-1 px-2  border rounded-3xl   items-center'>
              <span className=' '> <IoMenu />
            </span>
               {userData == null &&  
            <span className=''> 
            <GoPeople /></span>}
            {userData != null &&
            <span className='h-6 w-6 bg-black rounded-full text-white flex items-center justify-center'>{userData?.userName?.charAt(0)?.toUpperCase() || "?"}</span>
             }
            </button>
           {
            menu &&  <div className='h-auto border cursor-pointer border-gray-400 p-4  w-56 rounded-lg bg-[#F7F9FB] absolute mt-10 right-5'>
              {!userData &&    <ul className='' onClick={()=>{navigate("/login")}}>Login</ul>}
               {userData && <ul className='mt-5' onClick={()=>{handleLogout()}}>logout</ul>}
               <h1 className='border mt-4 border-gray-400 w-full'></h1>
               <ul className='mt-5' onClick={()=>{navigate("/listing")}}>List Your Home</ul>
               <ul className='mt-5' onClick={()=>{navigate("mylisting")}}>My Listing</ul>
               <ul className='mt-5' onClick={()=>{navigate("mybooking")}}>Check Booking</ul>
            </div>
           }

         </div>

    </div>

    <div className='h-16 w-full  flex items-center justify-center gap-7 cursor-pointer'>
        <div className={`flex flex-col items-center justify-center hover:border-b `} onClick={()=> handleCategory("Trending")}>
            <MdWhatshot className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Trending</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "villa" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("villa")}>
            <GiFamilyHouse className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Villa</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "farmhouse" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("farmhouse")}>
            <MdBedroomParent className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Farm House</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "pool house" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("pool house")}>
            <MdOutlinePool className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Pool House</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "rooms" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("rooms")}>
            <GiWoodCabin className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Rooms</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "flat" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("flat")}>
            <SiHomeassistantcommunitystore className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Flat</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "pg" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("pg")}>
            <IoBedOutline className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>PG</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "cabin" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("cabin")}>
            <FaTreeCity className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Cabins</h1>
        </div>
         <div className={`flex flex-col items-center justify-center  hover:border-b ${cate == "shop" ? "border-b border-gray-400" : " "}`} onClick={() => handleCategory("shop")}>
            <BiBuildingHouse className='text-2xl'/>
            <h1 className='text-xs  border-gray-500 '>Shops</h1>
        </div>
    </div>
    </div>
  )
}

export default Nav