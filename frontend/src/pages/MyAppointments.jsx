import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token ,getVetsData} = useContext(AppContext)
  const [appointments,setAppointments] = useState([])

  const months = ["","Jan", "Feb" , "Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments = async()=> {
    try {
      
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {

        const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})

        if (data.success) {
          toast.success(data.message)
          getUserAppointments()
          getVetsData()
          
        }else{
          toast.error(data.message)
        }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <p className="text-2xl font-semibold mb-4 text-gray-800">My Appointments</p>
      <div className="flex flex-col gap-6">
        {appointments.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-50">
            
            {/* Left Section: Image & Info */}
            <div className="flex items-center gap-4">
              <img className="w-24 h-24 rounded-lg object-cover border border-gray-300" src={item.vetData.image} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-700">{item.vetData.name}</p>
                <p className="text-gray-600">{item.vetData.speciality}</p>
                <p className="text-gray-500 text-sm font-medium mt-1">Address:</p>
                <p className="text-gray-700">{item.vetData.address.line1}</p>
                <p className="text-gray-700">{item.vetData.address.line2}</p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex flex-col gap-2">
              {!item.cancelled && <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"> Pay Online  </button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">Cancel Appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 round text-red-500'> Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
