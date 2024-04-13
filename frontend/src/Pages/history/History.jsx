import React, {startTransition, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Typography, Button } from "@material-tailwind/react"
import axios from 'axios'

const TABLE_HEAD = ["Gallons Requested","Delivery Address","Delivery Date","Suggested Price / Gallon","Total Amount Due"]

const History = () => {
  const [fuelQuotes, setFuelQuotes] = useState([])
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const name = localStorage.getItem('name')

  useEffect(() => {
    if (!name){
      navigate('/profile')
    }
    else{
      axios.get(`http://localhost:3001/history/${username}`)
      .then((response) =>{
        const info = response.data.fuelHistory.fuelInfo
        setFuelQuotes(info)
      })
      .catch((err) =>{
        console.error(err)
      })
    }
  }, [username, navigate])

  const handleFuel = () => {
    startTransition(() => {
      navigate("/fuelform")
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]">
      <div className="flex flex-col justify-center items-center h-3/4 w-screen gap-3">
        <Typography variant="h1" color="blue-gray" className="text-center">History</Typography>
        <Card className="h-3/4 w-3/4 overflow-scroll ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              // map fuelQuotes from db
              {fuelQuotes.map(({ requested, address, date, suggested, total }, index) => (
                <tr key={requested} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {requested}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {address}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {suggested}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {total}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <a onClick={handleFuel}>
          <Button variant="gradient" className="border-none">Back to Fuel Form?</Button>
        </a>
      </div>
    </div>
  )
}

export default History
