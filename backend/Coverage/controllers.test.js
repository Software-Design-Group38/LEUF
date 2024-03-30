const FuelController = require('../controllers/fuelQuoteController.js');
const LoginController = require('../controllers/loginController.js');
const ProfileController = require('../controllers/profileController.js');
const PricingModule = require('../pricingModule.js');
const app = require('../api/index.js')

// beforeEach(() => {
//   const app = require('../api/index.js')
// })

beforeAll(done => {
  done()
})

//fuel Quote Contoller
describe('FuelController', () => {
  describe('getQuote', () => {
    it('should return a 400 error if gallonsRequested is not a number or less than or equal to 0', () => {
      const req = {
        body: {
          fuelQuote: {
            gallonsRequested: -10, // Invalid value
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-03-28',
            suggestedPrice: 2.5,
            totalAmountDue: 50
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      FuelController.getQuote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "At least 1 gallon must be requested" });
    });

    it('should return a 200 status and success message if all inputs are valid', () => {
      const req = {
        body: {
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-03-28',
            suggestedPrice: 2.5,
            totalAmountDue: 50
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      FuelController.getQuote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Fuel quote submitted successfully" });
    });
    
  });

  // Add more test cases as needed
});

//login Controller
describe('LoginController', () => {
  describe('login', () => {
    it('should return a 400 error if username or password is missing', () => {
      const req = {
        body: {
          // Missing username and password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username and password are required" });
    });

    it('should return a 500 error if username is invalid', () => {
      const req = {
        body: {
          username: 'u', // Invalid username
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if password is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'pass' // Invalid password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if username is less than 4 characters', () => {
      const req = {
        body: {
          username: 'abc', // Invalid username
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if password is less than 8 characters', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'pass' // Invalid password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if username is more than 20 characters', () => {
      const req = {
        body: {
          username: 'invalidusernamemynameislarry', // invalid username
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if password is more than 30 characters', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'passwordmynameislarryandilikeicecream' // Invalid password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 200 status and success message if login is successful', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'validpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Login successful" });
    });
  });

  describe('register', () => {
    it('should return a 400 error if username or password is missing', () => {
      const req = {
        body: {
          // Missing username and password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username and password are required" });
    });

    it('should return a 500 error if username is less than 4 characters', () => {
      const req = {
        body: {
          username: 'abc', // Invalid username
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if password is less than 8 characters', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'pass' // Invalid password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if username is more than 20 characters', () => {
      const req = {
        body: {
          username: 'invalidusernamemynameislarry', // invalid username
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

    it('should return a 500 error if password is more than 30 characters', () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'passwordmynameislarryandilikeicecream' // Invalid password
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });
    
  });

});

// Profile Controller
describe('ProfileController', () => {
  describe('updateProfile', () => {
    it('should return a 500 error if name is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          name: '123', // Invalid name
          address1: '123 Main St',
          address2: '',
          city: 'City',
          state: 'ST',
          zipcode: '12345'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid name" });
    });

    it('should return a 500 error if address1 is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          name: 'John Doe',
          address1: '', // Invalid address1
          address2: '',
          city: 'City',
          state: 'ST',
          zipcode: '12345'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid address 1" });
    });

    it('should return a 500 error if address2 is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          name: 'John Doe',
          address1: '123 Main St',
          address2: 'Address2 that is too long, more than 100 characters'.repeat(3), // Invalid address2
          city: 'City',
          state: 'ST',
          zipcode: '12345'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid address 1" });
    });

    it('should return a 500 error if username is missing', () => {
      const req = {
        body: {} // Missing username
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if city contains invalid characters', () => {
      const req = {
        body: {
          username: 'validusername',
          name: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: '', // Invalid city
          state: 'ST',
          zipcode: '12345'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid city" });
    });

    it('should return a 500 error if state is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          name: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: 'City',
          state: 'California', // Invalid state
          zipcode: '12345'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid state code" });
    });

    it('should return a 500 error if zipcode is invalid', () => {
      const req = {
        body: {
          username: 'validusername',
          name: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: 'City',
          state: 'ST',
          zipcode: 'ABCDE' // Invalid zipcode
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid zipcode" });
    });

  });

});

// Pricing Module
describe('PricingModule', () => {
  describe('calculatePrice', () => {
    it('should calculate total price correctly for a new customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = false;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(862.5, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a new customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = false;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(2565, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a repeat customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = false;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(855, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a repeat customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = false;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(2542.5, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state new customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = true;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(877.5, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state new customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = true;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(2610, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state repeat customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = true;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(870, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state repeat customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = true;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toBeCloseTo(2587.5, 2); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    // Add more test cases for other scenarios
  });

  // Add more test cases for other methods if needed
});
