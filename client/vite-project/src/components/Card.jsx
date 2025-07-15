/* eslint-disable react/prop-types */
import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Card = ({image1,image2,image3,rent,id,city,landmark,title}) => {

  
  return (
    <div className='w-[300px] max-w-[85%] h-[400px] flex items-start  justify-start flex-col rounded-lg cursor-pointer relative '>
      <div className='w-[100%] h-[67%] rounded-lg scrollbar-hide  overflow-auto flex'>
            <img src={image1} className='flex-shrink-0 w-[100%]' alt="" />
            <img src={image2} alt="" className='flex-shrink-0 w-[100%]'/>
            <img src={image3} alt="" className='flex-shrink-0 w-[100%]'/>
      </div>
        <div className=' w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
                <div className='flex items-center justify-between text-[18px] '><span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()},{city.toUpperCase()}</span>
                    {/* <span className='flex items-center justify-center gap-[5px]'><FaStar className='text-[#eb6262]' />{ratings}</span> */}
                </div>
                <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>{title.toUpperCase()} </span>
                <span className='text-[16px] font-semibold text-[#986b6b]'>₹{rent}/day</span>
         </div>
    </div>
  )
}

export default Card