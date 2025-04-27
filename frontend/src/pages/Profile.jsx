import { useAuthStore } from "../store/authStore";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className='w-[calc(100%-20px)] max-w-200 mx-auto flex flex-col gap-2 pt-2'>
      <div className='h-40 relative grid grid-cols-2 place-items-center gap-2'>
        <div className='bg-white/20 h-[100%] w-[100%] rounded-[30px] flex flex-col justify-center items-center'>
          <h2 className='font-bold'>Total Order</h2>
          <h2>20</h2>
        </div>
        <div className='bg-white/20 h-[100%] w-[100%] rounded-[30px] flex flex-col justify-center items-center'>
          <h2 className='font-bold'>Total Spent</h2>
          <h2>₹32600/-</h2>
        </div>
        <div className='absolute bottom-[0] left-[50%] translate-x-[-50%] translate-y-[50%]'>
          <h1 className='rounded-[50%] h-35 w-35 max-sm:h-25 max-sm:w-25 bg-orange-400 border-3 grid place-items-center font-bold text-6xl'>
            {user.name[0].toUpperCase()}
          </h1>
        </div>
      </div>

      <div className='bg-white/20 w-[100%] min-h-[calc(100dvh-236px)] m-auto rounded-t-[30px] pt-20 p-3'>
        <p className='text-center font-bold text-[1.2rem]'>{user.name}</p>
        <section className='w-[100%] max-w-100 m-auto mt-6 mb-10 flex flex-col gap-5'>
          <div className='bg-black/40 py-3 px-4 rounded-[30px] flex items-center gap-2.5 text-[0.8rem]'>
            <i className="fa-solid fa-circle-user text-[1rem]"></i>
            <p>{user.name}</p>
          </div>
          <div className='bg-black/40 py-3 px-4 rounded-[30px] flex items-center gap-2.5 text-[0.8rem]'>
            <i className="fa-solid fa-envelope text-[1rem]"></i>
            <p>{user.email}</p>
          </div>
          <div className='bg-black/40 py-3 px-4 rounded-[30px] flex items-center justify-center gap-2.5 text-[0.8rem]'>
            <a>Share</a>
            <i className="fa-solid fa-share-nodes text-[1rem]"></i>
          </div>
          <button className='bg-green-600 rounded-[30px] p-2.5 text-[0.8rem] font-semibold'>
            Edit
          </button>
          <button className='bg-red-500 rounded-[30px] p-2.5 text-[0.8rem] font-semibold'
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>
      </div>
    </section>
  )
}

export default Profile