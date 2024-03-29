import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Input, Button, Typography, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"

const FuelForm = () => {
  // State variables to manage form data
  const [gallonsRequested, setGallonsRequested] = useState('')
  const [date, setDate] = useState()
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
      // Grab address from client profile
      deliveryAddress: "Address1234",
      deliveryDate: date,
      suggestedPrice: 2.5,
      totalAmountDue: totalAmountDue
    };
    
    //Add fuel quote to state
    addFuelQuote(fuelQuote)
    
    axios.post('http://localhost:3001/fuelform', {fuelQuote})
    .then(result => {
      console.log(fuelQuote)
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
        <form onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h1" color="blue-gray" className="text-center">Fuel Quote Form</Typography>
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
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  label="Select a Date"
                  required
                  onChange={() => null}
                  value={date ? format(date, "PPP") : ""}
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption: "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                    day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible",
                  }}
                />
              </PopoverContent>
            </Popover>
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
            <Button type="submit" size="lg" className="w-full">Submit</Button>
          </div>
          {/*<div>
            <label htmlFor="deliveryDate" className='w-1/2 font-semibold text-lg pr-1.5'>Delivery Date:</label>
            <input
              className='w-1/2 border rounded'
              type="date"
              id="deliveryDate"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
            </div>*/}
        </form>
      </div>
    </div>
  )
}

export default FuelForm;
