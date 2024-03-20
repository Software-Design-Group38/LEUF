import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Input, Button, Typography, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react"
//import { format } from "date-fns"
//import { DayPicker } from "react-day-picker"
//import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

const FuelForm = () => {
  // State variables to manage form data
  const [gallonsRequested, setGallonsRequested] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [fuelQuotes, setFuelQuotes] = useState([])
  const navigate = useNavigate()

  //Add fuel quote to state to store in history
  const addFuelQuote = (fuelQuote) => {
    setFuelQuotes([...fuelQuotes, fuelQuote])
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Calculate total amount due based on gallons requested (use pricing module when available)
    const suggestedPricePerGallon = 2.50; // Example suggested price per gallon
    const totalAmountDue = parseFloat(gallonsRequested) * suggestedPricePerGallon

    //Construct fuel quote object
    const fuelQuote = {
      gallonsRequested: parseFloat(gallonsRequested),
      deliveryDate: deliveryDate,
      totalAmountDue: totalAmountDue
    };
    
    //Add fuel quote to state
    addFuelQuote(fuelQuote)
    
    axios.post('http://localhost:3001/fuelform', {fuelQuote})
    .then(result => {
      console.log(result)
      navigate("/history")
    })
    .catch(err => console.log(err))

    // Display total amount due 
    console.log(fuelQuote)
    console.log('Total Amount Due:', totalAmountDue)
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]'>
      <div className='bg-white rounded-md p-6 w-122'>
      <Typography variant="h1" color="blue-gray" className="text-center">Fuel Quote Form</Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-4">
            <Input
              type="number"
              id="gallonsRequested"
              label="Gallons Requested"
              min={0}
              placeholder="0"
              required
              value={gallonsRequested}
              onChange={(e) => setGallonsRequested(e.target.value)}
            />
            <Input
              type="text"
              id="deliveryAddress"
              label="Delivery Address"
              placeholder="0"
              readOnly
              value={"123 Main St., City, State"} // Example client profile address
            />
          {/*  <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  label="Select a Date"
                  onChange={() => null}
                  value={date ? format(date, "PPP") : ""}
                />
              </PopoverHandler>
              <PopoverContent>

              </PopoverContent>
            </Popover>
          */}
          <Input
            type="number"
            id="suggestedPrice"
            label="Suggested Price / Gallon"
            value="2.50" // Example suggested price per gallon
            readOnly
          />
          <Input
            type="number"
            id="totalAmountDue"
            label="Total Amount Due"
            placeholder="0"
            value={(parseFloat(gallonsRequested) * 2.50).toFixed(2)} // Example calculation
            readOnly
          />
          </div>
          <div>
            <label htmlFor="deliveryDate" className='w-1/2 font-semibold text-lg pr-1.5'>Delivery Date:</label>
            <input
              className='w-1/2 border rounded'
              type="date"
              id="deliveryDate"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default FuelForm;
