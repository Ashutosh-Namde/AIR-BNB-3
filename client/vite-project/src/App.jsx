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

const App = () => {
  const {userData} = useContext(userDataContext)
  return (
    <div className='h-full w-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/listing' element={userData != null ? <ListingPage/>:<Navigate to={"/login"}/>}/>
        <Route path='/listing2' element={userData != null ?<ListingPage2/>:<Navigate to={"/login"}/>}/>
        <Route path='/listing3' element={userData != null ?<ListingPage3/>:<Navigate to={"/login"}/>}/>
        <Route path='/mylisting' element={userData != null ? <MyListing/>:<Navigate to={"/login"}/>}/>
      </Routes>
    </div>
  )
}

export default App