import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { Calendar, PawPrint, Scale, Clipboard } from 'lucide-react';

const MyVaccinations = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        if (!userData?._id) return;
        
        const response = await axios.get(`${backendUrl}/api/vaccinations/${userData._id}`);
        setVaccinations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vaccinations:', err);
        setError('Failed to fetch vaccination data');
        setLoading(false);
      }
    };

    fetchVaccinations();
  }, [backendUrl, userData]);

  if (loading) {
    return <div className="text-center py-8">Loading vaccinations...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (vaccinations.length === 0) {
    return <div className="text-center py-8">No vaccination records found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Vaccination Records</h2>
      
      <div className="grid gap-4">
        {vaccinations.map((vaccination) => (
          <div key={vaccination._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <PawPrint className="text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">{vaccination.petName}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Last Vaccination</p>
                  <p>{new Date(vaccination.vaccinationDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Next Vaccination</p>
                  <p>{new Date(vaccination.nextVaccinationDate).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Scale className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p>{vaccination.petWeight} kg</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clipboard className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Breed</p>
                  <p>{vaccination.petBreed}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVaccinations;