import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 px-6 mb-5 border-b border-b-gray-400 bg-white shadow-sm relative z-10'>
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.petskhana}
        alt="Pets Khana Logo"
        className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
      />

      {/* Desktop Navbar */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {['/', '/vets', '/about', '/contact'].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary font-semibold"
                : "text-gray-700 hover:text-primary transition-colors"
            }
          >
            <li className='py-1'>
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
            </li>
          </NavLink>
        ))}
      </ul>

      {/* Profile & Menu */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div
            className='relative cursor-pointer'
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover border-2 border-primary' src={userData.image} alt="Profile Pic" />
              <img className='w-2.5' src={assets.dropdownIcon} alt="Drop Down menu" />
            </div>

            {showDropdown && (
              <div className='absolute top-full right-0 min-w-48 bg-white rounded-lg flex flex-col gap-2 p-3 shadow-lg border border-gray-100 z-50'>
                <p
                  onClick={() => navigate('my-profile')}
                  className='text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded transition-colors duration-200'
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('my-appointments')}
                  className='text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded transition-colors duration-200'
                >
                  My Appointments
                </p>
                <p
                  onClick={() => navigate('/vaccination-alerts')}
                  className='text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded transition-colors duration-200'
                >
                  Vaccination Alerts
                </p>
                <p
                  onClick={() => navigate('/my-vaccinations')}
                  className='text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded transition-colors duration-200'
                >
                  My Vaccinations
                </p>
                <p
                  onClick={logout}
                  className='text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded transition-colors duration-200'
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-2 rounded-full font-medium hidden md:block hover:bg-primary-dark transition-colors shadow-sm'
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        {token ? (
          <img
            onClick={() => setShowMenu(true)}
            className='w-6 md:hidden cursor-pointer hover:opacity-80 transition-opacity'
            src={assets.menu_icon}
            alt="Menu Icon"
          />
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-2 rounded-full font-medium md:hidden hover:bg-primary-dark transition-colors shadow-sm'
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed w-full h-screen bg-white right-0 top-0 z-50 transform transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className='flex justify-between items-center p-5 border-b border-gray-300'>
            <img src={assets.petskhana} alt='Pets Khana Logo' className='h-12 w-auto' />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt='Close Icon'
              className='w-6 cursor-pointer hover:opacity-80 transition-opacity'
            />
          </div>
          <ul className='flex flex-col items-center gap-6 mt-10 text-lg font-medium'>
            <NavLink
              to='/'
              onClick={() => setShowMenu(false)}
              className='text-gray-700 hover:text-primary transition-colors'
            >
              Home
            </NavLink>
            <NavLink
              to='/vets'
              onClick={() => setShowMenu(false)}
              className='text-gray-700 hover:text-primary transition-colors'
            >
              All Veterinarians
            </NavLink>
            <NavLink
              to='/about'
              onClick={() => setShowMenu(false)}
              className='text-gray-700 hover:text-primary transition-colors'
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              onClick={() => setShowMenu(false)}
              className='text-gray-700 hover:text-primary transition-colors'
            >
              Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;