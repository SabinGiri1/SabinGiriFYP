import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { VetContext } from '../context/VetContext'
import { AdminContext } from '../context/AdminContext'
import { Home, Calendar, User, PlusCircle, ShoppingCart, Box} from 'lucide-react'

const Sidebar = () => {
  const { vToken } = useContext(VetContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-64">
      {/* Admin Sidebar */}
      {aToken && (
        <ul className="text-gray-600 mt-5">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <Home className="w-5" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <Calendar className="w-5" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={'/add-vet'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <PlusCircle className="w-5" />
            <p>Add Vet</p>
          </NavLink>
          <NavLink
            to={'/add-product'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <ShoppingCart className="w-5" />
            <p>Add Product</p>
          </NavLink>
          <NavLink
            to={'/vet-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <User className="w-5" />
            <p>Vets List</p>
          </NavLink>
          <NavLink
            to={'/all-products'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <Box className="w-5" />
            <p>Product List</p>
          </NavLink>
        </ul>
      )}

      {/* Vet Sidebar */}
      {vToken && (
        <ul className="text-gray-600 mt-5">
          <NavLink
            to={'/vet-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <Home className="w-5" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/vet-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <Calendar className="w-5" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={'/vet-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 hover:bg-indigo-50 transition-all ${
                isActive ? 'bg-indigo-50 border-r-4 border-primary font-medium' : ''
              }`
            }
          >
            <User className="w-5" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
