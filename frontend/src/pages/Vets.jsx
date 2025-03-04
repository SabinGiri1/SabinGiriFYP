import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Vets = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { vets } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(vets.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(vets)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [vets, speciality])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-lg text-gray-600 mb-6">Get Vets according to the needs of your pet</p>
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full sm:w-64">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm font-medium text-gray-600 mb-4">Filter by Speciality</p>
              <div className="space-y-3">
                <p
                  onClick={() =>
                    speciality === 'Grooming' ? navigate('/vets') : navigate('/vets/Grooming')
                  }
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    speciality === 'Grooming'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Grooming
                </p>
                <p
                  onClick={() =>
                    speciality === 'Clinic' ? navigate('/vets') : navigate('/vets/Clinic')
                  }
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    speciality === 'Clinic'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Clinic
                </p>
                <p
                  onClick={() =>
                    speciality === 'Vaccination'
                      ? navigate('/vets')
                      : navigate('/vets/Vaccination')
                  }
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    speciality === 'Vaccination'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vaccination
                </p>
              </div>
            </div>
          </div>

          {/* Vets Listing Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-w-16 aspect-h-9">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <p className="text-sm text-green-500">Available</p>
                    </div>
                    <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vets