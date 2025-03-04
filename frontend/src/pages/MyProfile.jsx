import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData ? (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative">
                <img
                  className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 hover:opacity-75 transition-all"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                {!image && (
                  <img
                    className="w-10 absolute bottom-2 right-2"
                    src={assets.upload_icon}
                    alt="Upload"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-200"
              src={userData.image}
              alt="Profile"
            />
          )}
        </div>

        {/* Name */}
        <div className="mt-6 text-center">
          {isEdit ? (
            <input
              className="text-3xl font-semibold text-gray-800 bg-gray-50 p-2 rounded-lg w-full text-center"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              value={userData.name}
            />
          ) : (
            <h1 className="text-3xl font-semibold text-gray-800">{userData.name}</h1>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Contact Information */}
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">Contact Information</p>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-blue-500">{userData.email}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="font-medium text-gray-700">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 p-2 rounded-lg w-full"
                  type="text"
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone}
                />
              ) : (
                <p className="text-blue-500">{userData.phone}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="font-medium text-gray-700">Address:</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                  />
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1} <br /> {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Basic Information */}
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">Basic Information</p>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="font-medium text-gray-700">Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-50 p-2 rounded-lg w-full"
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-500">{userData.gender}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="font-medium text-gray-700">Birthday:</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 p-2 rounded-lg w-full"
                  type="date"
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : (
                <p className="text-gray-500">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save/Edit Button */}
        <div className="mt-8 flex justify-center">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dark transition-all"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary text-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default MyProfile