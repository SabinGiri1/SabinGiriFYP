import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 relative overflow-hidden'>
            {/* ------------ Left Side ----------------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-10'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br /> With Our Trusted Veterinarians
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="Group Profiles" />
                    <p>
                        Petskhana has all you need to make your pet healthy. Simply book an <br className='hidden sm:block' /> appointment with our veterinarians.
                    </p>
                </div>
                <a 
                    href="#speciality" 
                    className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                >
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow Icon" />
                </a>
            </div>

            {/* ----------- Right Side ------------------ */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="Header Image" />
            </div>

            {/* Pet-themed decorative elements */}
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/2'></div>
            <div className='absolute top-0 right-0 w-16 h-16 bg-pink-300 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute top-1/4 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-20'></div>
        </div>
    );
};

export default Header;