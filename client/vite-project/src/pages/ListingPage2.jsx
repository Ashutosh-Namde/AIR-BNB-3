import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { listingDataContext } from "../context/ListingContext";
import { useContext } from "react";

const ListingPage2 = () => {
  const navigate = useNavigate();
  const{ category, setcategory } = useContext(listingDataContext);

  

  const categoryHandeler = (e) => {
    setcategory(e.target.textContent.toLowerCase());
    console.log("Selected Category:", e.target.textContent);
  };
  return (
    <div className="h-[100%] w-full flex items-center justify-center flex-col overflow-auto">
      <div>
        <FaArrowCircleLeft
          className="text-5xl text-red-700 absolute top-[10%] left-[10%]"
          onClick={() => {
            navigate("/listing");
          }}
        />
      </div>
      <div className="p-1.5  rounded-3xl text-white px-4 absolute top-[10%] right-[5%] border-2 bg-red-600">
        Set Your Category
      </div>
      <h1 className="text-2xl mt-32">
        Which Of these best describe your place?
      </h1>
      <div className="flex items-center justify-evenly  w-[40%] mt-10 flex-wrap gap-10 ">
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "shop" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center  ">
            <SiHomeassistantcommunitystore className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Shop</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "villa" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <GiFamilyHouse className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Villa</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "rooms" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <MdBedroomParent className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Rooms</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "pool house" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <MdOutlinePool className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Pool House</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "cabin" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <GiWoodCabin className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Cabin</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "flat" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <BiBuildingHouse className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Flat</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "pg" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <IoBedOutline className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">PG</h1>
          </div>
        </div>
        <div
          onClick={categoryHandeler}
          className={`h-18 w-32 rounded-xl flex justify-center  items-center border-1 shadow-xl  border-gray-300 hover:border-[1.5px] hover:border-gray-500 ${
            category === "farm house" ? " border-2 border-gray-500 " : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center ">
            <FaTreeCity className="text-2xl" />
            <h1 className="text-xs  border-gray-500 ">Farm House</h1>
          </div>
        </div>
      </div>
      <button
        disabled={!category}

        className="bg-red-700  text-white p-2 px-8 mt-10 right-50 absolute bottom-[15%] rounded-md "
        onClick={() => {
          navigate("/listing3");
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ListingPage2;
