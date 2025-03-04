import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopVets = () => {
  const navigate = useNavigate();
  const { vets } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>
      {/* Heading */}
      <h1 className='text-3xl font-bold text-primary'>Top Veterinarians to Pick</h1>
      <p className='sm:w-1/3 text-center text-gray-600 text-sm'>
        Look through our top veterinarians if you want to book a clinic appointment.
      </p>

      {/* Veterinarian Cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
        {vets.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300 group'
            key={index}
          >
            {/* Veterinarian Image */}
            <div className='w-full h-64 bg-blue-50 flex items-center justify-center overflow-hidden'>
              <img
                className='w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300'
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Veterinarian Details */}
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-semibold mt-2'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* "More" Button */}
      <button
        onClick={() => { navigate('/vets'); scrollTo(0, 0); }}
        className='bg-primary text-white px-12 py-3 rounded-full mt-10 hover:bg-primary-dark transition-colors duration-300 shadow-md transform hover:scale-105'
      >
        More
      </button>
    </div>
  );
};

export default TopVets;