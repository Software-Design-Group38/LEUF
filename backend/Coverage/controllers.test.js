const FuelController = require('../controllers/fuelQuoteController.js');
const LoginController = require('../controllers/loginController.js');
const ProfileController = require('../controllers/profileController.js');
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
    
    it('should return a 500 error if an error occurs during execution', () => {
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

      // Mocking an error during execution
      jest.spyOn(console, 'error').mockImplementation(() => {});

      FuelController.getQuote(req, res);

      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Unable to submit fuel quote" });
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

    // Add more test cases for other scenarios
  });

  // Add more test cases for other methods if needed
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
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid address 2" });
    });

    // Add more test cases for other fields and scenarios
  });

  // Add more test cases for other methods if needed
});