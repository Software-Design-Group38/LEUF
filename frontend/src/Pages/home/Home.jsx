import React, {useState} from 'react'

const Home = () => {
  return (
    <div className='flex justify-center items-center flex-col bg-gradient-to-b from-[#C5CCCE] to-[#2B475F] h-screen'>
      <h1>Welcome to <span className='text-white'>LEÜF</span>.</h1>
      <h2>Click below to get a fuel quote today.</h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 24 24" className='hover:fill-white'>
        <path className='hover:fill-white fill-black cursor-pointer' onClick={()=>{window.location.replace('/fuelform')}} d="M20 13c.55 0 1-.45 1-1s-.45-1-1-1h-1V5h1c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1h-1v-6zm-8 3c-1.66 0-3-1.32-3-2.95c0-1.3.5-1.67 3-4.55c2.47 2.86 3 3.24 3 4.55c0 1.63-1.34 2.95-3 2.95" />
      </svg>
    </div>
  )
}

export default Home