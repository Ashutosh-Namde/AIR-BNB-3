import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import  { authDataContext } from './AuthContext'
import axios from 'axios'
import { useState } from 'react'
import { userDataContext } from './UserContext'
import { set } from 'react-hook-form'

export const listingDataContext =createContext()


const ListingContext = ({children}) => {
    const {serverUrl} = useContext(authDataContext)

    const [title, settitle] = useState("")
const [description, setdescription] = useState("")
const [rent, setrent] = useState("")
const [city, setcity] = useState("")
const [landmark, setlandmark] = useState("")
const [category, setcategory] = useState("")
const [frontendImage1, setfrontendImage1] = useState(null)  
const [frontendImage2, setfrontendImage2] = useState(null)  
const [frontendImage3, setfrontendImage3] = useState(null)  
const [backendImage1, setbackendImage1] = useState(null)  
const [backendImage2, setbackendImage2] = useState(null)  
const [backendImage3, setbackendImage3] = useState(null)  
const [adding, setAdding] = useState(false)
const [listingdata, setlistingdata] = useState([]) 
const [newlistData, setnewlistData] = useState([])

  const handleAddListing = async () => {
        setAdding(true)
        console.log("Adding Listing")
         if (!backendImage1 || !backendImage2 || !backendImage3) {
    console.log("Please select all three images before submitting.");
    return;
  }
        try {

            let formData = new FormData()
     formData.append("title",title)
     formData.append("image1",backendImage1)
     formData.append("image2",backendImage2)
     formData.append("image3",backendImage3)
     formData.append("description",description)
     formData.append("rent",rent)
     formData.append("city",city)
     formData.append("landmark",landmark)
     formData.append("category",category)
        
        let result = await axios.post( serverUrl + "/listing/add" ,formData, {withCredentials:true}  )
        setAdding(false)
     console.log(" Listing added:", result.data);
     setlistingdata(prev => [...prev, result.data]);
setnewlistData(prev => [...prev, result.data]);
        // navigate("/")
        // toast.success("AddListing Successfully")
        settitle("")
        setdescription("")
       setfrontendImage1(null)
       setfrontendImage2(null)
       setfrontendImage3(null)
       setbackendImage1(null)
       setbackendImage2(null)
       setbackendImage3(null)
       setrent("")
       setcity("")
       setlandmark("")
       setcategory("")
            
        } catch (error) {
         setAdding(true)
  console.log(" Error message:", error.response?.data?.message || error.message);
}
        
     }

     const handleGetAllListing = async () => {
      try {
        const result = await axios.get(serverUrl + "/listing/allListing", { withCredentials: true });
            setnewlistData(result.data); 
        setlistingdata(result.data);
      
        console.log("All listings fetched:", result.data);
        console.log("All listings fetched2:", listingdata );
      
        
      } catch (error) {
        console.log("Error fetching listings:", error.response?.data?.message || error.message);
        
      }
     }

     useEffect(()=>{
handleGetAllListing()

     },[])
const value = {
    title, settitle,
    description, setdescription,
    rent, setrent,
    city, setcity,
    landmark, setlandmark,
    category, setcategory,
    frontendImage1, setfrontendImage1,
    frontendImage2, setfrontendImage2,
    frontendImage3, setfrontendImage3,
    backendImage1, setbackendImage1,
    backendImage2, setbackendImage2,
    backendImage3, setbackendImage3,
    adding, setAdding,
    handleAddListing,
    handleGetAllListing,
    listingdata, setlistingdata,
    newlistData, setnewlistData
    
}

  return (
   
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>

  )
}

export default ListingContext