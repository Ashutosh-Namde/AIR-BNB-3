import React, { Children, createContext } from 'react'
import { useState } from 'react'

export const authDataContext = createContext()

const AuthContext = ({children}) => {

   const [loading, setloading] = useState(false)

  let serverUrl = "http://localhost:3000"

 let value = {
    serverUrl,
    loading,
    setloading
  }
  return (
    <div>
    
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider >
    
    </div>
  )
}

export default AuthContext