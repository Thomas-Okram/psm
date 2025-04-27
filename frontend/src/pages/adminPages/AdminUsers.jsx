import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminSideBarIcon from '../../components/AdminSideBarIcon'
import AdminSideBar from '../../components/AdminSideBar'


const AdminUsers = () => {

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
    ? "http://localhost:8080/api" 
    : import.meta.env.VITE_API_URL;
    const getAllusers = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/viewUsers`);
        setAllUsers(response.data.users)
      } catch (error) {
        
      }
    }

    getAllusers();
    
  }, [])
  return (
    <>
      <AdminSideBarIcon />

      <section className="px-[15px] relative">
        <AdminSideBar/>

        <main className='ml-60 p-4 pr-0 max-sm:ml-0 max-sm:p-0 max-sm:mt-4 transition-[0.5s]'>
          <h1 className='font-semibold'>Users Details</h1>

          <section className='grid gap-2 mt-3'>
            <div className='grid grid-cols-[3fr_1fr_1fr] bg-orange-400 p-2 rounded-[6px] text-black'>
              <p>Name</p>
              <p className='text-center'>Order</p>
              <p>Spent</p>
            </div>

            {/* render this to display user details */}
            {allUsers.map((user, index) => (
              <div key={index} className='grid grid-cols-[3fr_1fr_1fr] bg-black/20 p-2 rounded-[6px]'>
                <div>
                  <p>{user.name}</p>
                  <p className='text-[0.8rem] font-extralight text-white/70'>{user.email}</p>
                </div>
                <p className='text-center'>{user.totalOrders}</p>
                <div>
                  <p>Rs {user.totalSpentINR}</p>
                  <p className='text-[0.8rem] font-light text-white/70'>(${user.totalSpentUSDT})</p>
                </div>
              </div>
            ))}
          </section>

         
        </main>
      </section>
    </>
  )
}

export default AdminUsers