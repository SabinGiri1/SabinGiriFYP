import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ---------- Left Section ------------ */}
                <div>
                    <img className='mb-5 w-40' src={assets.petskhana} alt="Petskhana Logo" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Petskhana helps pet owners groom their pets, vaccinate them, keep them healthy, and ensure they stay happy every day with the use of this application.
                    </p>
                    {/* Pet-themed decorative paw prints */}
                    <div className='mt-5 flex gap-2'>
                        <span className='text-2xl'>🐾</span>
                        <span className='text-2xl'>🐾</span>
                        <span className='text-2xl'>🐾</span>
                    </div>
                </div>

                {/* ---------- Center Section ------------ */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='hover:text-primary transition-all cursor-pointer'>Home</li>
                        <li className='hover:text-primary transition-all cursor-pointer'>About Us</li>
                        <li className='hover:text-primary transition-all cursor-pointer'>Contact Us</li>
                        <li className='hover:text-primary transition-all cursor-pointer'>Privacy and Policy</li>
                    </ul>
                </div>

                {/* ---------- Right Section ------------ */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='hover:text-primary transition-all cursor-pointer'>+977-9861893242</li>
                        <li className='hover:text-primary transition-all cursor-pointer'>petskhana@gmail.com</li>
                    </ul>
                    {/* Social Media Icons (Optional) */}
                    <div className='mt-5 flex gap-3'>
                        <span className='text-2xl cursor-pointer hover:text-primary transition-all'>🐶</span>
                        <span className='text-2xl cursor-pointer hover:text-primary transition-all'>🐱</span>
                        <span className='text-2xl cursor-pointer hover:text-primary transition-all'>🐾</span>
                    </div>
                </div>
            </div>

            {/* ------------Copyright Text-------------- */}
            <div>
                <hr className='border-gray-200' />
                <p className='py-5 text-sm text-center text-gray-600'>
                    Copyright 2025 @ Petskhana - All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;