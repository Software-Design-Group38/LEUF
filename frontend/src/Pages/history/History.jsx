import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const History = () => {
  const [fuelQuotes, setFuelQuotes] = useState([]);
  return (
    <div className='h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]'>
      <h2>Fuel Quote History</h2>
      <ul>
        {fuelQuotes.map((quote, index) => (
          <li key={index}>
            {/*Display quote details*/}
            Gallons Requested: {quote.gallonsRequested}, Delivery Date: {quote.deliveryDate}, Total Amount Due: {quote.totalAmountDue.toFixed(2)}
          </li>
        ))}
      </ul>
      {/*Should this be a link back to fuel form or home or two links? */}
      <Link to="/fuelform">Back to Fuel Form</Link>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default History
