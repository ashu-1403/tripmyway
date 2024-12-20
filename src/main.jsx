import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Createtrip from './component/Createtrip.jsx'
import Header from './component/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google' 
import TripDetails from './trip-details/[tripId]/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:"/createtrip",
    element:<Createtrip/>
  },
  {
    path:"/trip-details/:tripId",
    element:<TripDetails/>
  }

])

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <StrictMode>
    <Header/>
    <Toaster/>
   <RouterProvider router ={router}/>
  </StrictMode>,
  </GoogleOAuthProvider>
)
