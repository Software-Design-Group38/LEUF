import React, { useState, useEffect } from 'react'
import { Typography } from '@material-tailwind/react'
import axios from 'axios'

const Home = () => {
  const [name, setName] = useState("")
  const username = localStorage.getItem('username')

  useEffect(() => {
    axios.get(`http://localhost:3001/user/${username}`)
      .then((response) =>{
        if (response.status === 200){
          const user = response.data.userInfo
          setName(user.name)
        }
        else{
          console.log(`Received response: ${response}`)
          }
      })
      .catch((err) =>{
        console.error(err)
      })
  }, [])

  return (
    <div className='flex justify-center items-center flex-col bg-gradient-to-b from-[#C5CCCE] to-[#2B475F] h-screen'>
      <Typography variant="h1" className="text-center text-blue-600"><span className="text-black">Welcome to</span> LE<span className="text-white">Ü</span>F</Typography>
      <Typography variant="h3" className="text-center">Click below to get a fuel quote today.</Typography>
      <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 24 24" className='hover:fill-white'>
        <path
          className='hover:fill-white fill-blue-600 cursor-pointer' 
          onClick={()=>
            {
              if (!username){
                window.location.replace('/login')
              }
              else if (!name){
                window.location.replace('/profile')
              }
              else{
                window.location.replace('/fuelform')
              }
            }
          }
          d="M20 13c.55 0 1-.45 1-1s-.45-1-1-1h-1V5h1c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1h-1v-6zm-8 3c-1.66 0-3-1.32-3-2.95c0-1.3.5-1.67 3-4.55c2.47 2.86 3 3.24 3 4.55c0 1.63-1.34 2.95-3 2.95" />
      </svg>
    </div>
  )
}

export default Home