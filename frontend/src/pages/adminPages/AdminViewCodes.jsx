import React from 'react'
import { useEffect, useState } from "react";
import AdminSideBar from '../../components/AdminSideBar'
import AdminSideBarIcon from '../../components/AdminSideBarIcon'
import { useCodeStore } from "../../store/codeStore.js";

const AdminViewCodes = () => {
  const id = "admin";
  const { fetchVariants, types, variants } = useCodeStore();

  useEffect(() => {
      const handleFetchVariants = async () => {
        try {
          await fetchVariants(id);
          
        } catch (error) {
          console.log(error);
        }
      };
      
      handleFetchVariants();
    }, [id, fetchVariants]);

  return (
    <>
      <AdminSideBarIcon/>
      <div className="px-[15px] relative">
        <AdminSideBar/>
        <section className='flex flex-col gap-3 ml-60 mb-10 p-4 pr-0 max-sm:ml-0 max-sm:p-0 max-sm:mt-4 transition-[0.5s] text-center max-sm:text-[0.8rem]'>

          <div className='flex flex-1 justify-between p-2 rounded-[8px] bg-orange-400 text-black font-medium sticky top-[60px] max-sm:top-[100px]'>
            <p className='flex-1'>Item</p>
            <p className='flex-1'>Available</p>
            <p className='flex-1'>Hold</p>
            <p className='flex-1'>Sold</p>
          </div>

          {types.map((type, index) => (
            <section key={index} className='flex flex-col gap-1'>
              <div className=' p-2 bg-red-500/50 rounded-[8px]'>
                <p>{type.name} || {type.region}</p>
              </div>
              
              {variants.filter(item => item.type_id === type._id)
                .map((variant, i) => (
                  <div key={i} className='flex flex-1 justify-between p-2 bg-black/20 rounded-[8px]'>
                    <p className='flex-1'>{variant.name}</p>
                    <p className='flex-1'>{variant.stock}</p>
                    <p className='flex-1'>{variant.hold}</p>
                    <p className='flex-1'>{variant.sold}</p>
                  </div>
                ))
              }
            </section>
          ))}
          
        </section>
      </div>
    </>
  )
}

export default AdminViewCodes