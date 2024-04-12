import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Input, Typography, Select, Option, Button } from "@material-tailwind/react"
import { AuthContext } from '../../auth'

const states = [
    { name: "AL", fullName: "Alabama" },
    { name: "AK", fullName: "Alaska" },
    { name: "AZ", fullName: "Arizona" },
    { name: "AR", fullName: "Arkansas" },
    { name: "CA", fullName: "California" },
    { name: "CO", fullName: "Colorado" },
    { name: "CT", fullName: "Connecticut" },
    { name: "DE", fullName: "Delaware" },
    { name: "FL", fullName: "Florida" },
    { name: "GA", fullName: "Georgia" },
    { name: "HI", fullName: "Hawaii" },
    { name: "ID", fullName: "Idaho" },
    { name: "IL", fullName: "Illinois" },
    { name: "IN", fullName: "Indiana" },
    { name: "IA", fullName: "Iowa" },
    { name: "KS", fullName: "Kansas" },
    { name: "KY", fullName: "Kentucky" },
    { name: "LA", fullName: "Louisiana" },
    { name: "ME", fullName: "Maine" },
    { name: "MD", fullName: "Maryland" },
    { name: "MA", fullName: "Massachusetts" },
    { name: "MI", fullName: "Michigan" },
    { name: "MN", fullName: "Minnesota" },
    { name: "MS", fullName: "Mississippi" },
    { name: "MO", fullName: "Missouri" },
    { name: "MT", fullName: "Montana" },
    { name: "NE", fullName: "Nebraska" },
    { name: "NV", fullName: "Nevada" },
    { name: "NH", fullName: "New Hampshire" },
    { name: "NJ", fullName: "New Jersey" },
    { name: "NM", fullName: "New Mexico" },
    { name: "NY", fullName: "New York" },
    { name: "NC", fullName: "North Carolina" },
    { name: "ND", fullName: "North Dakota" },
    { name: "OH", fullName: "Ohio" },
    { name: "OK", fullName: "Oklahoma" },
    { name: "OR", fullName: "Oregon" },
    { name: "PA", fullName: "Pennsylvania" },
    { name: "RI", fullName: "Rhode Island" },
    { name: "SC", fullName: "South Carolina" },
    { name: "SD", fullName: "South Dakota" },
    { name: "TN", fullName: "Tennessee" },
    { name: "TX", fullName: "Texas" },
    { name: "UT", fullName: "Utah" },
    { name: "VT", fullName: "Vermont" },
    { name: "VA", fullName: "Virginia" },
    { name: "WA", fullName: "Washington" },
    { name: "WV", fullName: "West Virginia" },
    { name: "WI", fullName: "Wisconsin" },
    { name: "WY", fullName: "Wyoming" }
  ]

const Profile = () => {
    const [name, setName] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const navigate = useNavigate()
    const authState = useContext(AuthContext)
    //console.log(authState)

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!authState.username){
            //console.log('Username not defined in authState')
            return
          }

          const response = await axios.get(`http://localhost:3001/user/${authState.username}`)
          console.log(response)
        } catch (err) {
          console.error('Error fetching data:', err)
        }
      }

      fetchData()
    }, [authState.username])

    const onSubmit = (e) => {
      e.preventDefault()

      if (!state){
        alert("Please select a State.")
        return
      }

      const data = {
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode
      }
      axios.put('http://localhost:3001/profile', data)
      .then(result => {
        console.log(result)
        sessionStorage.setItem("name", name)
        navigate("/")
      })
      .catch(err => console.log(err))
	  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]">
        <div className="w-1/4 p-6 shadow-lg bg-white rounded-md">
          <form onSubmit={onSubmit}>
            <div className="mb-1 flex flex-col gap-4">
              <Typography variant="h1" color="blue-gray" className="text-center">Account Information</Typography>
              <Input
                type="text"
                id="name"
                label="Full Name"
                placeholder="Enter Your Name"
                title="Alphabetic characters only"
                size="lg"
                maxLength={50}
                pattern="[A-Za-z ]*"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                id="address1"
                label="Address 1"
                placeholder="Enter Your Address"
                size="lg"
                maxLength={100}
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Input
                type="text"
                id="address2"
                label="Address 2 (optional)"
                placeholder="Enter Your Address"
                size="lg"
                maxLength={100}
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
              <Input
                type="text"
                id="city"
                label="City"
                placeholder="Enter Your City"
                size="lg"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Select
                size="lg"
                varaint="outlined"
                label="State"
                value={state}
                onChange={(e) => setState(e)}
              >
                {states.map(state => (
                  <Option value={state.name}>
                    {state.fullName}
                  </Option>
                ))}
              </Select>
              <Input
                type="text"
                id="zipcode"
                label="Zipcode"
                placeholder="Enter Your Zipcode"
                size="lg"
                required
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              <Button type="submit" size="lg" className="w-full">Save</Button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Profile