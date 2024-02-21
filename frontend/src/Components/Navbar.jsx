import React, {useState} from 'react'
import {BsPerson} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='flex border-b-2 border-black items-center h-20 px-4 sticky top-0'>
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
        <div onClick={handleNav} className={nav ? 'absolute right-0 top-20 bg-gray-100/90 rounded-md px-4 py-7 flex flex-col' : 'hidden'}>
            <div className='flex flex-col mt-10 mb-5'>
                <button>Manage Account</button>
            </div>
            <div className='flex flex-col'>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar