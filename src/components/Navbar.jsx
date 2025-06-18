import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const {user , setShowLogin , logout , credit }  = useContext(AppContext);
    const navigate = useNavigate() ; 
  return (
    <div className='flex items-center justify-between p-5'>
      <Link to='/'>
      <div className='flex flex-row items-center mr-4'>
      <img src={assets.logo} alt="" className='w-20 sm:w-32 lg:w-40'  />
      </div>
      </Link>
      
      <div>
        {
            user ? 
             <div className='flex items-center gap-2 sm:gap-5'>
                <button onClick={()=>navigate('/buy')} className=' flex items-center text-sm px-5 py-2 sm:px-7 sm:py-3 rounded-full hover:scale-105  transition-all duration-500 bg-green-500'>
                    <img src={assets.credit_star}  className='w-4' />
                    <p className='ml-1 text-xm sm:text-sm font-medium text-black'>Credits left : {credit}</p>
                </button>
                <p className='text-white max-sm:hidden pl-4'>Hi , {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow max-sm:ml-0 border-4 border-black rounded-full' />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li className='py-1  px-2 cursor-pointer pr-10'  onClick={logout}>LogOut</li>
                        </ul>
                    </div>
                </div>
             </div>   
             :
             <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=> navigate('/buy')} className='cursor-pointer'>Prices</p>
                <button className='bg-green-600 text-white px-7 py-2 sm:px-10 sm:py-3 text-sm rounded-full' onClick={()=>{
                  setShowLogin("true")
                }}>LogIN</button>
             </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
