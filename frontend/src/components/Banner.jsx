import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden'>
            {/* --------------- Left side --------------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 z-10'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Get Vaccination Notification Alerts</p>
                    <p className='mt-4'>Inform Vets and Get Timely Vaccinations</p>
                </div>
                <button 
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                    className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                > 
                    Create Account 
                </button>
            </div>

            {/* ------------ Right Side -------------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.bannerimage} alt="Pet Banner" />
            </div>

            {/* Pet-themed decorative elements */}
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/2'></div>
            <div className='absolute top-0 right-0 w-16 h-16 bg-pink-300 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute top-1/4 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-20'></div>
        </div>
    );
};

export default Banner;