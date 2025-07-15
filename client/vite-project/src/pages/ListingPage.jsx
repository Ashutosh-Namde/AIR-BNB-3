import React, { useContext } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";

const ListingPage = () => {
  const {
    title,
    settitle,
    description,
    setdescription,
    rent,
    setrent,
    city,
    setcity,
    landmark,
    setlandmark,
    frontendImage1,
    setfrontendImage1,
    frontendImage2,
    setfrontendImage2,
    frontendImage3,
    setfrontendImage3,
    backendImage1,
    setbackendImage1,
    backendImage2,
    setbackendImage2,
    backendImage3,
    setbackendImage3,
    handleAddListing 
  } = useContext(listingDataContext);

  const navigate = useNavigate();

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setbackendImage1(file);
    setfrontendImage1(URL.createObjectURL(file));

  };
   const handleImage2 = (e) => {
    const file = e.target.files[0];
    setbackendImage2(file);
    setfrontendImage2(URL.createObjectURL(file));

  };
   const handleImage3 = (e) => {
    const file = e.target.files[0];
    setbackendImage3(file);
    setfrontendImage3(URL.createObjectURL(file));

  };

const handleSubmit = async (e) => {
  e.preventDefault();
 
    navigate("/listing2");
 
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative">
 
      <FaArrowCircleLeft
        className="text-4xl text-red-700 absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      />

  
      <div className="absolute top-6 right-6 bg-red-600 text-white py-2 px-5 rounded-xl shadow-md font-semibold">
        Set Up Your Home
      </div>


      <form onSubmit={handleSubmit } className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-2xl space-y-5 border border-gray-200">
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
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md"
            
          >
            Add Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingPage;
