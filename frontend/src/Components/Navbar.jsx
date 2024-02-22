import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  const disableNav = ['/login', '/profile']

  const {pathname} = useLocation();

  if (pathname === '/login') return null

  return (
    <div className='flex border-b-2 border-black h-20 px-4 sticky top-0 z-40 bg-white'>
        <div className='flex justify-start items-center w-full'>
            <div>
                <h1>FUEL</h1>
            </div>
            <ul className='flex'>
                <li><a href='#fuelform' onClick={()=>{window.location.replace('/fuelform')}}>Fuel Quote Form</a></li>
                <li><a href='#history' onClick={()=>{window.location.replace('/history')}}>Fuel Quote History</a></li>
            </ul>
        </div>
        
        {/* Dropdown Menu */}
        <div className='flex justify-end items-center w-full'>
            <p className='p-4 text-xl'>Jane Doe</p>
            <div onClick={handleNav} className='px-4 z-10'>
                {nav ? <AiOutlineClose className='text-black' size={20} /> : <BsPerson size={20} />}
            </div>
            <div className={nav ? 'absolute right-0 top-20 bg-gray-100/90 rounded-md px-4 py-7 flex flex-col' : 'hidden'}>
                <div className='flex flex-col mt-10 mb-5'>
                    <button onClick={()=>{window.location.replace('/profile')}}>Manage Account</button>
                </div>
                <div className='flex flex-col'>
                    <button onClick={()=>{window.location.replace('/login')}}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar