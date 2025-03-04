import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { VetContext } from '../context/VetContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { vToken, setVToken } = useContext(VetContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    vToken && setVToken('')
    vToken && localStorage.removeItem('vToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-4 bg-white shadow-sm">
      {/* Logo and Role Badge */}
      <div className="flex items-center gap-3">
        <img
          onClick={() => navigate('/')}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        <span className="border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-600 bg-gray-50">
          {aToken ? 'Admin' : 'Vet'}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-6 py-2 rounded-full hover:bg-primary-dark transition-all"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar