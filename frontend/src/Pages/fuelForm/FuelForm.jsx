import React, { useState } from 'react';

const FuelForm = () => {
  // State variables to manage form data
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [fuelQuotes, setFuelQuotes] = useState([]);

  //Add fuel quote to state to store in history
  const addFuelQuote = (fuelQuote) => {
    setFuelQuotes([...fuelQuotes, fuelQuote]);
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Calculate total amount due based on gallons requested (use pricing module when available)
    const suggestedPricePerGallon = 2.50; // Example suggested price per gallon
    const totalAmountDue = parseFloat(gallonsRequested) * suggestedPricePerGallon;

    //Construct fuel quote object
    const fuelQuote = {
      gallonsRequested: parseFloat(gallonsRequested),
      deliveryDate: deliveryDate,
      totalAmountDue: totalAmountDue
    };
    
    //Add fuel quote to state
    addFuelQuote(fuelQuote);
    
    // Display total amount due 
    console.log('Total Amount Due:', totalAmountDue);
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-gradient-to-b from-[#C5CCCE] to-[#2B475F]'>
      <div className='bg-white rounded-md p-6 w-122'>
        <h2 className='mb-4'>Fuel Quote Form</h2>
        <form onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="gallonsRequested" className='w-1/2 font-semibold text-lg pr-1.5'>Gallons Requested:</label>
            <input
              className='w-1/2 border rounded'
              placeholder='0'
              min={0}
              type="number"
              id="gallonsRequested"
              value={gallonsRequested}
              onChange={(e) => setGallonsRequested(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="deliveryAddress" className='w-1/2 font-semibold text-lg pr-1.5'>Delivery Address:</label>
            <input
              className='w-1/2 border rounded'
              type="text"
              id="deliveryAddress"
              value="123 Main St, City, State" // Example client profile address
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
          <div>
            <label htmlFor="suggestedPrice" className='w-1/2 font-semibold text-lg pr-1.5'>Suggested Price / Gallon:</label>
            <span>$</span>
            <input
              className='w-40 border rounded'
              type="number"
              id="suggestedPrice"
              value="2.50" // Example suggested price per gallon
              readOnly
            />
          </div>
          <div>
            <label htmlFor="totalAmountDue" className='w-1/2 font-semibold text-lg pr-1.5'>Total Amount Due:</label>
            <span>$</span>
            <input
              className='w-1/2 border rounded'
              type="number"
              placeholder='0'
              id="totalAmountDue"
              value={(parseFloat(gallonsRequested) * 2.50).toFixed(2)} // Example calculation
              readOnly
            />
          </div>
          <button type="submit" className='w-full mt-4 hover:bg-gray-500 hover:text-white shadow appearance-none border rounded'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FuelForm;
