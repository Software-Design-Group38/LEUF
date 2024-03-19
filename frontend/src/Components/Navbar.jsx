import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  const {pathname} = useLocation();

  if (pathname === '/login' || pathname === '/register') return null

  return (
    <div className='flex h-20 px-4 sticky top-0 z-40 bg-gradient-to-t from-[#E4E7E4] to-[#A6B2B8]'>
        <div className='flex justify-start items-center w-full'>
            <div className='flex items-center cursor-pointer' onClick={()=>{window.location.replace('/')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                    <path fill="black" d="M20 13c.55 0 1-.45 1-1s-.45-1-1-1h-1V5h1c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1h-1v-6zm-8 3c-1.66 0-3-1.32-3-2.95c0-1.3.5-1.67 3-4.55c2.47 2.86 3 3.24 3 4.55c0 1.63-1.34 2.95-3 2.95" />
                </svg>
                <h1>LEÜF</h1>
            </div>
            <ul className='flex'>
                <li><a href='#fuelform' onClick={()=>{window.location.replace('/fuelform')}}>Fuel Quote Form</a></li>
                <li><a href='#history' onClick={()=>{window.location.replace('/history')}}>Fuel Quote History</a></li>
            </ul>
        </div>
        
        {/* Dropdown Menu */}
        <div className='flex justify-end items-center w-full'>
            <p className='p-4 text-xl'>Jane Doe</p>
            <div onClick={handleNav} className='px-4 z-10 cursor-pointer'>
                {nav ? <AiOutlineClose className='text-black' size={20} /> : <BsPerson size={20} />}
            </div>
            <div className={nav ? 'absolute right-0 top-20 bg-[#E4E7E4] rounded-b-md px-4 py-7 flex flex-col' : 'hidden'}>
                <div className='flex flex-col mb-5'>
                    <button className='hover:bg-gray-500 hover:text-white' onClick={()=>{window.location.replace('/profile')}}>Manage Account</button>
                </div>
                <div className='flex flex-col'>
                    <button className='hover:bg-gray-500 hover:text-white' onClick={()=>{window.location.replace('/login')}}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar