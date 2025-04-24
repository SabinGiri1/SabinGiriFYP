import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedVets from '../components/RelatedVets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { vetId } = useParams()
    const { vets, currencySymbol, backendUrl, token, getVetsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [vetInfo, setVetInfo] = useState(false)
    const [vetSlots, setVetSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchVetInfo = async () => {
        const vetInfo = vets.find((vet) => vet._id === vetId)
        setVetInfo(vetInfo)
    }

    const getAvailableSolts = async () => {
        setVetSlots([])
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime
                const isSlotAvailable = vetInfo.slots_booked[slotDate] && vetInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setVetSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }
    
        console.log("Vet Info:", vetInfo);
    
        if (!vetSlots[slotIndex] || vetSlots[slotIndex].length === 0) {
            toast.error("No available slots for this date.");
            return;
        }
    
        const date = vetSlots[slotIndex][0].datetime;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
    
        console.log("Booking Details:", { vetId, slotDate, slotTime });
    
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { vetId, slotDate, slotTime },
                { headers: { token } }
            );
    
            console.log("API Response:", data);
    
            if (data.success) {
                toast.success(data.message);
                getVetsData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Booking Error:", error);
            toast.error(error.message);
        }
    };
    
    useEffect(() => {
        if (vets.length > 0) {
            fetchVetInfo()
        }
    }, [vets, vetId])

    useEffect(() => {
        if (vetInfo) {
            getAvailableSolts()
        }
    }, [vetInfo])

    return vetInfo ? (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Vet Details */}
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-72">
                    <img className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg" src={vetInfo.image} alt={vetInfo.name} />
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <p className="flex items-center gap-2 text-3xl font-bold text-gray-800">
                        {vetInfo.name} <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <p>{vetInfo.degree} - {vetInfo.speciality}</p>
                        <span className="px-2 py-1 text-xs font-semibold bg-gray-100 rounded-full">{vetInfo.experience} years</span>
                    </div>
                    <div className="mt-4">
                        <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                            About <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
                        </p>
                        <p className="mt-2 text-gray-600">{vetInfo.about}</p>
                    </div>
                    <p className="mt-4 text-gray-600 font-semibold">
                        Appointment fee: <span className="text-gray-800">{currencySymbol}{vetInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className="mt-8">
                <p className="text-xl font-semibold text-gray-800">Booking Slot</p>
                <div className="flex gap-4 mt-4 overflow-x-auto">
                    {vetSlots.length && vetSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`flex flex-col items-center justify-center p-4 min-w-20 rounded-full cursor-pointer transition-all duration-300 ${
                                slotIndex === index ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-200 hover:shadow-md'
                            }`}
                        >
                            <p className="text-sm font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 mt-4 overflow-x-auto">
                    {vetSlots.length && vetSlots[slotIndex].map((item, index) => (
                        <p
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`px-6 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
                                item.time === slotTime ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-200 hover:shadow-md'
                            }`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <button
                    onClick={bookAppointment}
                    className="mt-6 w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
                >
                    Book an Appointment
                </button>
            </div>

            {/* Related Vets */}
            <RelatedVets speciality={vetInfo.speciality} vetId={vetId} />
        </div>
    ) : null
}

export default Appointment