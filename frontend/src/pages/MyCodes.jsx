import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useEffect, useState } from "react";

function MyCodes() {

  const { user } = useAuthStore();
    const { orders, viewOrders } = useOrderStore();
  
    useEffect(() => {
      const handleViewOrders = async () => {
        try {
          await viewOrders(user._id);
          
        } catch (error) {
          console.log(error);
        }
      };
      
      handleViewOrders();
    }, [user._id, viewOrders]);
  
  
  
    const [allOrders, setAllOrders] = useState([]);
  
    useEffect(() => {
      setAllOrders(orders);
      
    }, [orders]);
  
  return (
    <section className="w-[calc(100%-30px)] max-w-200 mx-auto mt-4 flex flex-col gap-2 mb-5">
      {/* <div className="flex flex-col gap-2 mb-3">
        <div className="flex gap-2 h-8">
          <input className="bg-black/20 border border-[#ffffff2c] flex-1 rounded-[4px] px-3 outline-0 min-w-20"
            type="text" name="" id="" placeholder="Search by Order ID"
          />
          <button className="w-[30%] bg-orange-500 rounded-[4px] font-semibold text-[0.8rem]">Search</button>
        </div>
        <div className="flex justify-around max-sm:flex-col gap-1.5">
          <input className="bg-orange-100 flex-1 px-3 rounded-[4px] text-black outline-0 min-h-8"
            type="date" name="" id="" 
          />
          <p className="mx-3 text-center">to</p>
          <input className="bg-orange-100 flex-1 px-3 rounded-[4px] text-black outline-0 min-h-8" 
            type="date" name="" id="" 
          />
        </div>
      </div> */}


      {
        allOrders.length === 0 && (
          <div className="bg-black/20 mt-30 w-60 m-auto text-center py-5 rounded-[8px]">
            You have no codes
          </div>
        )
      }


      {allOrders
      .filter((order) => order.status === "Success")
      .map((order, index) => (
        <div key={index} className="bg-black/20 rounded-[8px] border border-[#ffffff2c] flex flex-col gap-y-2 pb-2 text-[0.8rem]">
          <div className="fle justify-between rounded-t-[8px] py-2 px-3 font-semibold bg-orange-500">
            <p>Order ID: {order._id}</p>
            <p>Order Date: {order.createdAt}</p>
          </div>

        {order.items.map((item) => (
          item.codes.map((code, i) => (
            <div key={i} className="flex justify-between items-center px-3">
              <div>
                <p className="text-orange-500 font-semibold">{item.name}</p>
                <p>{item.value}</p>
              </div>
              <p>{code}</p>
            </div>
          ))
        ))}
          
        </div>
      ))}
    </section>
  )
}

export default MyCodes