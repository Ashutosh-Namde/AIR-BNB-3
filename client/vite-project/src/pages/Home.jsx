import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'
import Card from '../components/Card'
import { listingDataContext } from '../context/ListingContext'

const Home = () => {
  const {listingdata  , setlistingdata , newlistData , setnewlistData} = useContext(listingDataContext)

  
  return (
    <div className='h-full w-full'>
      <Nav/>
      <div className='h-full w-full mt-50 flex flex-wrap gap-5 items-center scrollbar-hide justify-center h-screen'>
        {newlistData.map((list)=>(
          <Card  title={list.title} landmark={list.landmark} city={list.city} image1={list.image1}
          image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} rating={list.rating} host={list.host} isBooked={list.isBooked}/>
        ))}
        </div>
    </div>
  )
}

export default Home