import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export const userDataContext = createContext()




const UserContext = ({children}) => {
    
const {serverUrl} = useContext(authDataContext);
const [userData, setuserData] = useState(null)

const getCurrentUser = async()=>{
    try {
        const result = await axios.get(serverUrl + "/user/currentUser",{
          withCredentials:true
        })
        
          setuserData(result.data)
          
          
        
    } catch (error) {
        setuserData(null)
        console.log(error.response.data);
        
    }  
}
 useEffect(()=>{
    getCurrentUser()
    },[])

    const value = {
        userData,
        setuserData
    }

  return (
    <div>
            <userDataContext.Provider value={value}>{children}</userDataContext.Provider>
    </div>
  )
}

export default UserContext