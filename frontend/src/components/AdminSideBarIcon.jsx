import {Link} from 'react-router-dom'
import { PanelRightClose, ChartColumnBig, PanelRightOpen, Archive, Ticket, Users } from "lucide-react";
import { useEffect, useRef } from 'react';
const AdminSideBarIcon = () => {


  const sideBarRef = useRef(null);
  const sideBarOpenRef = useRef(null);
  const sideBarCloseRef = useRef(null);

  // useEffect(() => {
  //   const handleClick = (event) => {
  //     if (!sideBarRef.current.contains(event.target) && !sideBarIconRef.current.contains(event.target)) {
  //       sideBarRef.current.classList.remove('openSideBar');
  //     }
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [])

  const handleToggleSideBar = () => {
    if (sideBarRef.current) {
      sideBarRef.current.style.left = sideBarRef.current.style.left === '0px' ? '-100%' : '0';
    }
  };

  return (
    <>
      <div className="backdrop-blur-[40px] bg-[rgba(105,105,105,0.32)] sticky top-15 h-10 z-1 flex items-center pl-[15px] sm:hidden">
        <PanelRightClose ref={sideBarOpenRef} onClick={handleToggleSideBar}/>
      </div>
    
      <aside ref={sideBarRef} className='fixed bg-black/60 backdrop-blur-[30px] p-3 pt-0 z-1 w-60 h-[calc(100%-60px)] top-15 left-[-240px] sm:hidden transition-all duration-[0.6s]'>
        <div className='w-full flex justify-end items-center h-10'>
          <PanelRightOpen ref={sideBarCloseRef} onClick={handleToggleSideBar} className='hover' />
        </div>
        
        <Link to={"/adminPanel/dashboard"} className='flex gap-2 p-2 hover:bg-black/30 rounded-[4px] hover:text-orange-400 mb-1'>
          <ChartColumnBig /> Dashboard
        </Link>
        <Link to={"/adminPanel/product"} className='flex gap-2 p-2 hover:bg-black/30 rounded-[4px] hover:text-orange-400 mb-1'>
          <Archive /> Product
        </Link>
        <Link to={"/adminPanel/viewCode"} className='flex gap-2 p-2 hover:bg-black/30 rounded-[4px] hover:text-orange-400 mb-1'>
          <Ticket /> View Codes
        </Link>
        <Link to={"/adminPanel/users"} className='flex gap-2 p-2 hover:bg-black/30 rounded-[4px] hover:text-orange-400 mb-1'>
          <Users /> Users
        </Link>
      </aside>
    </>
  )
}

export default AdminSideBarIcon
