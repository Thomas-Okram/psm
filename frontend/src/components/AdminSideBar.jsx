import React from 'react'
import {Link} from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className='z-1 backdrop-blur-[4px] flex flex-col gap-2 fixed p-5 top-[70px] w-60 h-[calc(100dvh-80px)] border border-[#ffffff2c] rounded-[10px] bg-black/20 max-sm:w-0 max-sm:p-0 max-sm:border-0 overflow-hidden transition-[0.5s]'>
      <h1 className="text-center py-5 font-bold text-[1.3rem]">Admin Panel</h1>
      <Link to={"/adminPanel/dashboard"} className='py-3 px-5 bg-amber-600 w-[100%] flex gap-3 items-center rounded-[8px]'>
        <i className="fa-solid fa-chart-simple"></i>
        Dashboard
      </Link>
      <Link to={"/adminPanel/product"} className='py-3 px-5 bg-amber-600 w-[100%] flex gap-3 items-center rounded-[8px]'>
        <i className="fa-solid fa-boxes-packing"></i>
        Product
      </Link>
      <Link to={"/adminPanel/viewCode"} className='py-3 px-5 bg-amber-600 w-[100%] flex gap-3 items-center rounded-[8px]'>
        <i className="fa-solid fa-receipt"></i>
        View Codes
      </Link>
      <Link to={"/adminPanel/users"} className='py-3 px-5 bg-amber-600 w-[100%] flex gap-3 items-center rounded-[8px]'>
        <i className="fa-solid fa-users"></i>
        Users
      </Link>
    </div>
  )
}

export default AdminSideBar