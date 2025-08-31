import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ListingContext from './context/ListingContext.jsx'
import BookingContext from './context/BookingContext.jsx'
import { CommentProvider } from "./context/comment";  // ✅ curly braces




createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <AuthContext>
   <ListingContext>
     <UserContext>
      <BookingContext>
        <CommentProvider>
              <App />
        </CommentProvider>
     
      </BookingContext>
     </UserContext>
    </ListingContext>
   </AuthContext>
  </BrowserRouter>
)
