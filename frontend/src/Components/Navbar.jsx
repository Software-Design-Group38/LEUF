import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='flex items-center h-20 px-4'>
        <div>
            <h1>FUEL</h1>
        </div>
        <ul className='flex'>
            <li>Fuel Quote Form</li>
            <li>Fuel Quote History</li>
        </ul>

        {/* Dropdown Menu */}
        <div onClick={handleNav} className='absolute right-0 px-4 py-7 z-10'>
            {nav ? <AiOutlineClose className='text-black' size={20} /> : <BsPerson size={20} />}
        </div>
        <div onClick={handleNav} className={nav ? 'absolute right-0 top-0 bg-gray-100/90 rounded-md px-4 py-7 flex flex-col' : 'absolute left-[-100%] top-0 bg-gray-100/90 px-4 py-7 flex flex-col'}>
            <li className='border-b mt-5'>Manage Profile</li>
            <div className='flex flex-col'>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar