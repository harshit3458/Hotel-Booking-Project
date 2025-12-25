import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Hero from './Components/Hero';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AllRooms from './Pages/AllRooms';
import RoomDetails from './Pages/RoomDetails';
import MyBookings from './Pages/MyBookings';
import HotelReg from './Components/HotelReg';
import Layout from './Pages/hotelOwner/Layout';
import Dashboard from './Pages/hotelOwner/Dashboard';
import AddRoom from './Pages/hotelOwner/AddRoom';
import ListRoom from './Pages/hotelOwner/ListRoom';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
import Loader from './Components/Loader';

const App = () => {

  const isOwnerPath=useLocation().pathname.includes("owner");
  const {showHotelReg}=useAppContext();

  return (
    <div>
      <Toaster />
      { !isOwnerPath && <Navbar />}
      { showHotelReg && <HotelReg />}
      <div className='min-h-[70vh]'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/rooms' element={<AllRooms />}></Route>
            <Route path='/rooms/:id' element={<RoomDetails />}></Route>
            <Route path='/my-bookings' element={<MyBookings />}></Route>
            <Route path='/loader/:nextUrl' element={<Loader />}></Route>
            <Route path='/owner' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='add-room' element={<AddRoom />} />
              <Route path='list-room' element={<ListRoom/>} />
            </Route>
          </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
