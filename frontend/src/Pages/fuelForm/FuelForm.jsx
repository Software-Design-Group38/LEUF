import React, { useState } from 'react';

const FuelForm = () => {
  // State variables to manage form data
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [fuelQuotes, setFuelQuotes] = useState('');

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
    <div>
      <h2>Fuel Quote Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gallonsRequested">Gallons Requested:</label>
          <input
            type="number"
            id="gallonsRequested"
            value={gallonsRequested}
            onChange={(e) => setGallonsRequested(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input
            type="text"
            id="deliveryAddress"
            value="123 Main St, City, State" // Example client profile address
            readOnly
          />
        </div>
        <div>
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="suggestedPrice">Suggested Price / gallon:</label>
          <input
            type="number"
            id="suggestedPrice"
            value="2.50" // Example suggested price per gallon
            readOnly
          />
        </div>
        <div>
          <label htmlFor="totalAmountDue">Total Amount Due:</label>
          <input
            type="number"
            id="totalAmountDue"
            value={(parseFloat(gallonsRequested) * 2.50).toFixed(2)} // Example calculation
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FuelForm;
