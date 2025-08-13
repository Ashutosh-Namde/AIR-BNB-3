import React, { useContext } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import Card from '../components/Card';


const MyListing = () => {
  const navigate = useNavigate()

  const {userData} = useContext(userDataContext)
  console.log("userData in MyListing:", userData);
  



  return (
    <div className="flex justify-center items-center flex-col relative">
       <FaArrowCircleLeft
        className="text-4xl text-red-700 absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div>
        <h1 className="text-3xl text-center mt-10 border border-gray-400 shadow-2xl px-40 border-2 py-2">My Listing</h1>
          {userData.listing.map((list)=>(
          <Card  title={list.title} landmark={list.landmark} city={list.city} image1={list.image1}
          image2={list.image2} image3={list.image3} rent={list.rent} id={list._id}/>
        ))}
      </div>
    </div>
  )
}

export default MyListing