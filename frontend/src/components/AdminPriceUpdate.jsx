import React from 'react'
import { useCodeStore } from '../store/codeStore'
import { useState } from 'react';


const AdminPriceUpdate = ({ onClose, variant_id, name }) => {

  const {priceUpdate, message} = useCodeStore();
  const [priceINR, setPriceINR] = useState('');
  const [priceUSDT, setPriceUSDT] = useState('');

  const handleUpdatePrice = () => {
    if (priceINR !== '' && priceUSDT !== '') {
      priceUpdate(variant_id, priceINR, priceUSDT);
    }
  };

  
  return (
    <div className='bg-gray-900 flex flex-col gap-3 w-[calc(100%-60px)] max-w-[400px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center p-5 rounded-[8px] z-2'>
      <h1 className='text-amber-600 font-semibold'>Update Price</h1>
      <h1>{name}</h1>
      <div className='relative'>
        <p className='absolute left-3 top-2'>₹</p>
        <input className='bg-white/20 w-[100%] rounded-[4px] p-2 pl-8 appearance-none'
          type="number"
          value={priceINR}
          onChange={(e) => setPriceINR(e.target.value)}
          placeholder='price (INR)'
        />
      </div>
      <div className='relative'>
        <p className='absolute left-3 top-2'>$</p>
        <input className='bg-white/20 w-[100%] rounded-[4px] p-2 pl-8 appearance-none'
          type="number"
          value={priceUSDT}
          onChange={(e) => setPriceUSDT(e.target.value)}
          placeholder='price (USDT)'
        />
      </div>

      <div className='flex justify-between gap-3'>
        <button className='bg-white/20 p-2 rounded-[4px] font-medium px-5'
          onClick={onClose}
        >
          Cancel
        </button>
        <button className='bg-amber-600 p-2 rounded-[4px] font-medium flex-1'
          onClick={handleUpdatePrice}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default AdminPriceUpdate