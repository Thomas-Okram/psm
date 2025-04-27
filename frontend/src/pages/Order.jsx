import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useEffect, useState } from "react";

const Order = () => {

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
      {/* filter section */}
      {/* <div className="flex flex-col gap-2 mb-3">
        <div className="flex gap-2 h-8">
          <input className="bg-black/20 border border-[#ffffff2c] flex-1 rounded-[4px] text-blac px-3 outline-0 min-w-20"
            type="text" name="" id="" placeholder="Search by Order ID"
          />
          <button className="w-[30%] bg-amber-500 rounded-[4px] font-semibold text-[0.8rem] text-black">Search</button>
        </div>
        <div className="flex justify-around max-sm:flex-col gap-1.5">
          <input className="bg-amber-100 flex-1 px-3 rounded-[4px] text-black outline-0 min-h-8"
            type="date" name="" id="" 
          />
          <p className="mx-3 text-center">to</p>
          <input className="bg-amber-100 flex-1 px-3 rounded-[4px] text-black outline-0 min-h-8" 
            type="date" name="" id="" 
          />
        </div>
      </div> */}

      {
        allOrders.length === 0 && (
          <div className="bg-black/20 mt-30 w-60 m-auto text-center py-5 rounded-[8px]">
            No order history
          </div>
        )
      }
      

      {/* render the orders */}
      {allOrders.map((order, index) => (
        <div key={index} className="bg-black/20 rounded-[8px] border border-[#ffffff2c] flex flex-col gap-y-2 text-[0.8rem]">
          {/* order id and status */}
          <div className='flex justify-between py-2 px-3 bg-amber-500 font-semibold text-black rounded-t-[8px]'>
            <p>{order._id}</p>
            <p>{order.status}</p>
          </div>
          {/* each items in the order details */}
          <div className='px-3 flex flex-col gap-1.5'>
            {order.items.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <div>
                  <p>{item.name}</p>
                  <p>{item.value} * {item.qty} units</p>
                </div>
                <div>
                  <p>Rs. {item.priceINR}/unit</p>
                </div>
              </div>
            ))}
          </div>
          {/* total and order details at the bottom */}
          <div className='flex justify-between border-t border-[#ffffff2c] rounded-b-[8px]'>
            <div className='py-1.5 px-3 text-[0.7rem]'>
              <p>Payment: {order.paymentMethod}</p>
              <p>Order Date: {order.createdAt}</p>
            </div>
            <div className='bg-[#ffffff2c] flex flex-col justify-center items-center text-left min-w-[20%] rounded-br-[8px] px-3 font-semibold text-[0.7rem]'>
              <p>Rs.{order.totalINR}/-</p>
              <p>(${order.totalUSDT})</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Order