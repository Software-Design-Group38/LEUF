import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Input, Button, Typography, Popover, PopoverHandler, PopoverContent, List, ListItem, ListItemPrefix } from "@material-tailwind/react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"

const FuelForm = () => {
  const [gallonsRequested, setGallonsRequested] = useState('')
  const [date, setDate] = useState()
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [street, setStreet] = useState('')
  const [suggestedPrice, setSuggestedPrice] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [openPopover, setOpenPopover] = useState(false)
  const [formComplete, setFormComplete] = useState(false)
  const [partialComplete, setPartialComplete] = useState(false)
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const name = localStorage.getItem('name')

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  }

  useEffect(() => {
    if (!name){
      navigate('/profile')
    }
    axios.get(`http://localhost:3001/user/${username}`)
      .then((response) =>{
        if (response.status === 200){
          const user = response.data.userInfo
          setStreet(user.address1)
          setCity(user.city)
          setState(user.state)
        }
      })
      .catch((err) =>{
        console.error(err)
      })
  }, [ username, navigate, name ])

  useEffect(() => {
    const isPartial = 
    gallonsRequested !== '' &&
    date

    const isComplete =
      gallonsRequested !== '' &&
      date &&
      street !== '' &&
      city !== '' &&
      state !== '' &&
      !isNaN(suggestedPrice) &&
      !isNaN(totalPrice)
  
    setFormComplete(isComplete)
    setPartialComplete(isPartial)
  }, [gallonsRequested, date, street, city, state, suggestedPrice, totalPrice])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const address = {
      street: street,
      city: city,
      state: state,
    }

    //Construct fuel quote object
    const fuelQuote = {
      gallonsRequested: parseFloat(gallonsRequested),
      deliveryAddress: address,
      deliveryDate: date,
      suggestedPrice: suggestedPrice,
      totalPrice: totalPrice
    }
    
    axios.post('http://localhost:3001/fuelform', {username, fuelQuote})
    .then(result => {
      navigate("/history")
    })
    .catch(err => console.log(err))

  }

  const handleGetQuote = (event) => {
    event.preventDefault()

    axios.get(`http://localhost:3001/fuelform/${username}`, {
      params: {
        gallonsRequested: gallonsRequested
      }
    })
    .then(result => {
      setTotalPrice(result.data.totalAmountDue)
      setSuggestedPrice(result.data.suggestedPrice)
    })
    .catch(err => console.log(err))
  }

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
            <div className="relative">
              <Input
                type="text"
                id="deliveryAddress"
                label="Delivery Address"
                placeholder="0"
                readOnly
                value={`${street}, ${city}, ${state}`} // Example client profile address
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Popover open={ openPopover } handler={ setOpenPopover }>
                  <PopoverHandler { ...triggers }>
                    <i className="fa-solid fa-circle-info text-gray-500 cursor-pointer"/>
                  </PopoverHandler>
                  <PopoverContent { ...triggers } className="z-50 max-w-[20rem]">
                    <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-2">
                      <Typography color="blue-gray" className="text-sm">{'Address retrieved from profile. To update, save a new one in Manage Profile.'}</Typography>
                    </div>
                    <List className='p-0'>
                      <a href='/profile'>
                        <ListItem className='text-sm font-normal py-1.5'>
                          <ListItemPrefix>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"
                                  fill="#90A4AE"
                                />
                            </svg>
                          </ListItemPrefix>
                          Manage Profile
                        </ListItem>
                      </a>
                    </List>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
                  disabled={{ before: new Date() }}
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
              type="text"
              id="suggestedPrice"
              label="Suggested Price / Gallon"
              value={!isNaN(suggestedPrice) ? `$${parseFloat(suggestedPrice).toFixed(2)}` : ""}
              readOnly
            />
            <Input
              type="text"
              id="totalAmountDue"
              label="Total Amount Due"
              placeholder="0"
              value={!isNaN(totalPrice) ? `$${parseFloat(totalPrice).toFixed(2)}` : ""}
              readOnly
            />
            <Button type="submit" size="lg" className="w-full" onClick={handleGetQuote} disabled={!partialComplete}>Get Quote</Button>
            <Button type="submit" size="lg" className="w-full" color='blue' onClick={handleSubmit} disabled={!formComplete}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FuelForm;
