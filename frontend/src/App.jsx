import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Vets from './pages/Vets'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import VaccinationAlerts from './pages/VaccinationAlerts'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import ProductList from './components/ProductList'
import MyVaccinations from './components/MyVaccinations'
import ProductDetails from './pages/Productdetails'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/vets' element={<Vets/>} />
        <Route path='/vets/:speciality' element={<Vets/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointment/:vetId' element={<Appointment/>} />
        <Route path='/vaccination-alerts' element={<VaccinationAlerts/>} />
        <Route path='/my-vaccinations' element={<MyVaccinations/>} />

        <Route path="/shop" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App