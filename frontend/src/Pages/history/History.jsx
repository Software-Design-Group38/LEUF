import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const History = () => {
  const [fuelQuotes, setFuelQuotes] = useState([]);

  return (
    <div className='h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]'>
      <div className="flex flex-col overflow-y-auto justify-center items-center">
        <h2 className='m-10'>Fuel Quote History</h2>
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            <div className="overflow-y-auto">
              <table className="text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Gallons Requested</th>
                    <th scope="col" className="px-6 py-4">Delivery Address</th>
                    <th scope="col" className="px-6 py-4">Delivery Date</th>
                    <th scope="col" className="px-6 py-4">Suggested Price / gallon</th>
                    <th scope="col" className="px-6 py-4">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500 hover:bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                  </tr>
                  <tr className="border-b dark:border-neutral-500 hover:bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                  </tr>
                  <tr className="border-b dark:border-neutral-500 hover:bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ul>
          <li><a href='#fuelform' className='hover:text-white' onClick={()=>{window.location.replace('/fuelform')}}>Back to Fuel Quote Form</a></li>
        </ul>
      </div>
     {/* <div className='flex flex-col justify-center items-center'>
        <h2 className='m-10'>Fuel Quote History</h2>
        <div className='h-200 border-2 rounded-md'>
          <ul className='flex flex-row'>
            <li>Gallons Requested</li>
            <li>Delivery Address</li>
            <li>Delivery Date</li>
            <li>Suggested Price / Gallon</li>
            <li>Total Amount Due</li>
            {fuelQuotes.map((quote, index) => (
              <li key={index}>
                {/*Display quote details
                Gallons Requested: {quote.gallonsRequested}, Delivery Date: {quote.deliveryDate}, Total Amount Due: {quote.totalAmountDue.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        {/*Should this be a link back to fuel form or home or two links?
        <Link to="/fuelform">Back to Fuel Form</Link>
        <li><a href='#fuelform' onClick={()=>{window.location.replace('/fuelform')}}>Back to Fuel Quote Form</a></li>
        {/*<Link to="/home">Back to Home</Link>
      </div> */}
    </div>
  );
};

export default History
