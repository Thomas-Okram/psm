import React from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import AdminPriceUpdate from '../../components/AdminPriceUpdate.jsx';
import AdminSideBarIcon from '../../components/AdminSideBarIcon'


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCodeStore } from "../../store/codeStore.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

const AdminProduct = () => {

  const id = "admin";
  const { fetchVariants, types, variants } = useCodeStore();

  const [showPopup, setShowPopup] = useState(false);
  const [variant_id, setVariant_id] = useState(null);
  const [name, setName] = useState(null);

  const handleUpdatePrice = (variant_id, name) => {
    setVariant_id(variant_id);
    setName(name)
    setShowPopup(true);
  };

  
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
  

  // Show a loading state if necessary data is not available
  if (!types || !types.length || !variants || !variants.length) {
    
    return (
      <div className="px-5 relative">
        <AdminSideBar />
        <LoadingSpinner />
      </div>
    )
  }
  

  


  return (
    <>
      <AdminSideBarIcon />
    
      <div className="px-[15px] relative">
        <AdminSideBar />
        
        <section className='ml-60 p-4 pr-0 max-sm:ml-0 max-sm:p-0 max-sm:mt-4 transition-[0.5s]'>
          <h1 className='font-semibold'>Product</h1>

          {types.map((type, index) => (
            <div key={index} className='bg-black/20 p-4 rounded-[8px] my-3'>
              <h4 className='font-semibold text-amber-600'>{type.name}</h4>
              <p className='flex gap-3 items-center mb-3'>
                {type.region} 
                <img className='h-5 w-5 object-cover rounded-[50%]' src={`../../${type.flag}`} alt="" />
              </p>

              {/* table */}
              <table className='w-[100%] max-sm:text-[0.8rem]'>
                <thead className='text-amber-600'>
                  <tr className='h-10'>
                    <th>Item</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody className='text-center'>
                  {variants.filter(item => item.type_id === type._id)
                    .map((variant, i) => (

                    <tr key={i} className='border-t border-white/20'> 
                      <td>{variant.name}</td>
                      <td>{variant.stock}</td>
                      <td className='py-2'>
                        Rs. {variant.priceINR} <br />
                        <span className='text-amber-600'>(</span>
                          ${variant.priceUSDT}
                        <span className='text-amber-600'>)</span>
                      </td>
                      <td className='text-amber-600'>
                        <Link onClick={() => handleUpdatePrice(variant._id, variant.name)}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Link>
                        
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>
            </div>
          ))}

        </section>
        {showPopup && (
          <AdminPriceUpdate onClose={() => setShowPopup(false)} variant_id={variant_id} name={name}/>
        )}
      </div>
    </>
  )
}

export default AdminProduct