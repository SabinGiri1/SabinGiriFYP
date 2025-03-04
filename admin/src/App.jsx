import React, { useContext } from 'react'
import { VetContext } from './context/VetContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddVet from './pages/Admin/AddVet';
import VetsList from './pages/Admin/VetsList';
import Login from './pages/Login';
import VetAppointments from './pages/Vet/VetAppointments';
import VetDashboard from './pages/Vet/VetDashboard';
import VetProfile from './pages/Vet/VetProfile';

const App = () => {

  const { vToken } = useContext(VetContext)
  const { aToken } = useContext(AdminContext)

  return vToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-vet' element={<AddVet />} />
          <Route path='/vet-list' element={<VetsList />} />
          <Route path='/vet-dashboard' element={<VetDashboard />} />
          <Route path='/vet-appointments' element={<VetAppointments />} />
          <Route path='/vet-profile' element={<VetProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App