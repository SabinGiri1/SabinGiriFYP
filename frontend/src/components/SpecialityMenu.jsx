import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-50' id='speciality'>
      {/* Heading */}
      <h1 className='text-3xl font-bold text-primary'>What Do You Want For Your Pet?</h1>
      <p className='sm:w-1/3 text-center text-gray-600 text-sm'>
        Petskhana helps you groom your pets, ensure their health is fine, and fully vaccinate them.
      </p>

      {/* Speciality Cards */}
      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto px-4 sm:px-0'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-center cursor-pointer flex-shrink-0 hover:scale-105 transition-all duration-300 group'
            key={index}
            to={`/vets/${item.speciality}`}
          >
            {/* Speciality Image */}
            <div className='w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300'>
              <img
                className='w-12 h-12 sm:w-16 sm:h-16 object-contain'
                src={item.image}
                alt={item.speciality}
              />
            </div>

            {/* Speciality Name */}
            <p className='text-sm font-medium text-gray-700 mt-3 group-hover:text-primary transition-colors duration-300'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;