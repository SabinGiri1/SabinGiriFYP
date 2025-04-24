import React, { useState } from 'react';
import axios from 'axios';
import { PawPrint, Calendar, Scale, Clipboard } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const VaccinationAlerts = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    petName: '',
    vaccinationDate: '',
    nextVaccinationDate: '',
    nextVaccinationTime: '',
    petWeight: '',
    petBreed: '',
    email: userData.email || '',
    userId: userData._id || '', // Add userId to formData
  });

  console.log(userData.name);
  console.log(userData.email);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Include userId in the data being sent
      const dataToSend = {
        ...formData,
        userId: userData._id // Ensure userId is included
      };
      
      const response = await axios.post(`${backendUrl}/api/vaccinations/vaccinations`, dataToSend);
      console.log('Data sent successfully:', response.data);
      
      // Reset form
      setFormData({
        petName: '',
        vaccinationDate: '',
        nextVaccinationDate: '',
        nextVaccinationTime: '',
        petWeight: '',
        petBreed: '',
        email: userData.email || '',
        userId: userData._id || '',
      });
      alert('Vaccination details submitted successfully');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Vaccination Alerts Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="petName" className="block text-sm font-semibold text-gray-700 mb-2">Pet Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <PawPrint className="text-gray-500 mr-2" />
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="vaccinationDate" className="block text-sm font-semibold text-gray-700 mb-2">Vaccination Date</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Calendar className="text-gray-500 mr-2" />
            <input
              type="date"
              id="vaccinationDate"
              name="vaccinationDate"
              value={formData.vaccinationDate}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="nextVaccinationDate" className="block text-sm font-semibold text-gray-700 mb-2">Next Vaccination Date</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Calendar className="text-gray-500 mr-2" />
            <input
              type="date"
              id="nextVaccinationDate"
              name="nextVaccinationDate"
              value={formData.nextVaccinationDate}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="nextVaccinationTime" className="block text-sm font-semibold text-gray-700 mb-2">Next Vaccination Time</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Calendar className="text-gray-500 mr-2" />
            <input
              type="datetime-local"
              id="nextVaccinationTime"
              name="nextVaccinationTime"
              value={formData.nextVaccinationTime}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="petWeight" className="block text-sm font-semibold text-gray-700 mb-2">Pet Weight (kg)</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Scale className="text-gray-500 mr-2" />
            <input
              type="number"
              id="petWeight"
              name="petWeight"
              value={formData.petWeight}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="petBreed" className="block text-sm font-semibold text-gray-700 mb-2">Pet Breed</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Clipboard className="text-gray-500 mr-2" />
            <input
              type="text"
              id="petBreed"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VaccinationAlerts;
