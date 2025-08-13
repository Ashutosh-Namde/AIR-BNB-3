import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ListingPage from './pages/ListingPage'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './context/UserContext'
import { useContext } from 'react'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'

const App = () => {
  const {userData} = useContext(userDataContext)
  return (
    <div className='h-full w-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/listing' element={userData != null ? <ListingPage/>:<Navigate to={"/"}/>}/>
        <Route path='/listing2' element={userData != null ?<ListingPage2/>:<Navigate to={"/"}/>}/>
        <Route path='/listing3' element={userData != null ?<ListingPage3/>:<Navigate to={"/"}/>}/>
        <Route path='/mylisting' element={userData != null ? <MyListing/>:<Navigate to={"/"}/>}/>
        <Route path='/viewcard' element={userData != null ?<ViewCard/>:<Navigate to={"/login"}/>}/>
        <Route path='/mybooking' element={userData != null ?<MyBooking/>:<Navigate to={"/"}/>}/>
        <Route path='/booked' element={userData != null ?<Booked/>:<Navigate to={"/booked"}/>}/>

      </Routes>
    </div>
  )
}

export default App