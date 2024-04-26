const FuelController = require('../controllers/fuelQuoteController.js');
const LoginController = require('../controllers/loginController.js');
const ProfileController = require('../controllers/profileController.js');
const PricingModule = require('../pricingModule.js');
const Auth = require("../middleware/authToken.jsx");
const app = require('../api/index.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, UserInfo } = require("../models/userModel.js");
const { FuelQuote } = require('../models/fuelModel.js')
require('dotenv/config');
const dotenv = require("dotenv");


beforeAll(done => {
  done()
})

////////// Fuel Quote Contoller Tests //////////
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

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Unable to GET fuel quote" });
    });

    it('should return a 404 error if user is not found', async () => {
      const req = {
        params: {
          username: 'nonexistentuser'
        },
        query: {
          gallonsRequested: 100
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await FuelController.getQuote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
    /*
    it('should return a 200 status and success message if fuel quote is submitted successfully', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
    
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(UserInfo, 'findOne').mockResolvedValueOnce({ state: 'CA' });
      jest.spyOn(FuelQuote, 'exists').mockResolvedValueOnce(false);
      jest.spyOn(PricingModule, 'calculatePrice').mockReturnValueOnce(150);
    
      await FuelController.getQuote(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Unable to GET fuel quote" });
    });
    */
    it('should return a 200 status and quote details if user is found', async () => {
      const req = {
        params: {
          username: 'testuser'
        },
        query: {
          gallonsRequested: 100
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(UserInfo, 'findOne').mockResolvedValueOnce({ state: 'TX' });
      jest.spyOn(FuelQuote, 'exists').mockResolvedValueOnce(false);

      // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
      const pricingModule = {
        suggestedPrice: 1.725,
        totalAmountDue: 862.5
      };
      jest.spyOn(PricingModule, 'calculatePrice').mockReturnValueOnce(pricingModule);

      await FuelController.getQuote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        suggestedPricePerGallon: pricingModule.suggestedPricePerGallon,
        totalPrice: pricingModule.totalPrice,
        message: "Fuel quote GET success"
      });
    });
    
  });

  describe('getHistory', () => {
    it('should return a 500 error if an error occurs while fetching fuel history', async () => {
      const req = {
        params: {
          username: 'testuser'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));

      await FuelController.getHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });

    it('should return a 200 status and user history if found', async () => {
      const req = {
        params: {
          username: 'testuser'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(FuelQuote, 'findOne').mockResolvedValueOnce({
        fuelInfo: [
          {
            galReq: 100,
            address: '123 Main St',
            date: '2024-04-01',
            suggestedPrice: 1.50,
            total: 150
          }
        ]
      });

      await FuelController.getHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fuelHistory: {
        fuelInfo: [
          {
            galReq: 100,
            address: '123 Main St',
            date: '2024-04-01',
            suggestedPrice: 1.50,
            total: 150
          }
        ]
      }, message: "User history found" });
    });
  });

  describe('quoteSubmit', () => {
    it('should return a 400 status and error message if gallonsRequested is not a number', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 'invalid',
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "At least 1 gallon must be requested" });
    });

    it('should return a 400 error if gallonsRequested is missing or invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            // Missing gallonsRequested
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "At least 1 gallon must be requested" });
    });


    it('should return a 400 status and error message if deliveryAddress is empty', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid delivery address" });
    });

    it('should return a 400 status and error message if suggestedPrice is not a number', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 'invalid',
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid suggested price." });
    });

    it('should return a 400 status and error message if totalPrice is not a number', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 'invalid'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid total price." });
    });

    it('should return a 400 error if suggestedPrice or totalPrice is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            // Missing suggestedPrice and totalPrice
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid suggested price." });
    });


    it('should return a 400 status and error message if gallonsRequested is zero', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 0,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "At least 1 gallon must be requested" });
    });

    it('should return a 404 status and error message if user is not found', async () => {
      const req = {
        body: {
          username: 'nonexistentuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it('should return a 200 status and success message if fuel quote is submitted successfully', async () => {
      const req = {
        body: {
          username: 'testuser',
          fuelQuote: {
            gallonsRequested: 100,
            deliveryAddress: '123 Main St',
            deliveryDate: '2024-04-01',
            suggestedPrice: 1.50,
            totalPrice: 150
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(FuelQuote, 'updateOne').mockResolvedValueOnce();

      await FuelController.quoteSubmit(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Fuel quote submitted successfully" });
    });
  });

});

////////// login Controller Tests //////////
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

    it('should return a 404 error if user is not registered', async () => {
      const req = {
        body: {
          username: 'nonexistentuser',
          password: 'password'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User is not registered" });
    });

    it('should return a 401 error if password is incorrect', async () => {
      const req = {
        body: {
          username: 'existinguser',
          password: 'incorrectpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ password: await bcrypt.hash('correctpassword', 10) });

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Username or password is incorrect" });
    });

    it('should return a 200 status with token and user info if login is successful', async () => {
      const req = {
        body: {
          username: 'existinguser',
          password: 'correctpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        cookie: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890', username: 'existinguser', password: await bcrypt.hash('correctpassword', 10) });
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('mockedToken');

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: 'mockedToken',
        user: {
          username: "existinguser"
        }
      });
      expect(res.cookie).toHaveBeenCalledWith('token', 'mockedToken', { httpOnly: true, sameSite: 'strict' });
    });
    
  });

  describe('register', () => {
    it('should return a 409 error if user already exists', async () => {
      const req = {
        body: {
          username: 'existinguser',
          password: 'validpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      // Mocking database check for existing user
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ username: 'existinguser' });

      await LoginController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: "Username is already registered" });
    });

    it('should return a 200 status and success message if registration is successful', async () => {
      const req = {
        body: {
          username: 'newuser',
          password: 'newpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      // Mocking database check for new user
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      // Mocking bcrypt.hash
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');
      // Mocking User.create
      jest.spyOn(User, 'create').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('mockedToken');

      await LoginController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ 
        message: "Sign up successful",
        token: "mockedToken" 
      });
    });
  });

  describe('logout', () => {
    it('should clear the token cookie and return a 200 status', async () => {
      const req = {};
      const res = {
        clearCookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await LoginController.logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
    });
  });

});

////////// Profile Controller Tests //////////
describe('ProfileController', () => {
  describe('updateProfile', () => {
    it('should return a 500 error if name is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 12345,
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid name" });
    });

    it('should return a 404 error if user is not found', async () => {
      const req = {
        body: {
          username: 'nonexistentuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });
    
    it('should return a 200 status and success message if profile is updated successfully', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
    
      // Mocking database check for user
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
    
      // Mocking UserInfo.updateOne
      jest.spyOn(UserInfo, 'updateOne').mockResolvedValueOnce();
    
      await ProfileController.updateProfile(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if address1 is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '',
            city: 'TestCity',
            state: 'TX',
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid address 1" });
    });

    it('should return a 500 error if address2 is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            address2: '123 Main Stlablajbfvkadjbflaebvdjbnakdjfbakdfjbkadfjblakdfjblakdfjblkajfblksjfdbslkdfjblskjfbslkdjfblskdjf',
            city: 'TestCity',
            state: 'TX',
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid address 2" });
    });

    it('should return a 500 error if state is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'California', // Invalid state code
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if city is invalid', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: '',
            state: 'CA', // Invalid state code
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if city is invalid 2', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: '123MainStlablajbfvkadjbflaebvdjbnakdjfbakdfjbkadfjblakdfjblakdfjblkajfblksjfdbslkdfjblskjfbslkdjfblskdjf',
            state: 'CA', 
            zipcode: '12345'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if zipcode is greater than 9', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: 'InvalidZip' // Invalid zipcode format
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if zipcode is less than 5', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: 'Inv' // Invalid zipcode format
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

    it('should return a 500 error if zipcode does not exist', async () => {
      const req = {
        body: {
          username: 'testuser',
          data: {
            name: 'TestUser',
            address1: '123 Main St',
            city: 'TestCity',
            state: 'TX',
            zipcode: '' // Invalid zipcode format
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of undefined (reading 'length')" });
    });

  });

  describe('getProfile', () => {
    it('should return a 404 error if user info is not found', async () => {
      const req = {
        params: {
          username: 'nonexistentuser'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await ProfileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of null (reading '_id')" });
    });

    it('should return a 200 status and user info if found', async () => {
      const req = {
        params: {
          username: 'testuser'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(UserInfo, 'findOne').mockResolvedValueOnce({
        name: 'TestUser',
        address1: '123 Main St',
        city: 'TestCity',
        state: 'TX',
        zipcode: '12345'
      });

      await ProfileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        userInfo: {
          name: 'TestUser',
          address1: '123 Main St',
          city: 'TestCity',
          state: 'TX',
          zipcode: '12345'
        },
        message: "User found"
      });
    });

    it('should return a 500 error if user info is null', async () => {
      const req = {
        params: {
          username: 'testuser'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(UserInfo, 'findOne').mockResolvedValueOnce(null); // Simulating user info not found

      await ProfileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Cannot read properties of null (reading '_id')" });
    });
  });

});

////////// Pricing Module Tests //////////
describe('PricingModule', () => {
  describe('calculatePrice', () => {
    it('should calculate total price correctly for a new customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = false;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.725, totalPrice: 862.5 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a new customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = false;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.71, totalPrice: 2565 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a repeat customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = false;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.71, totalPrice: 855 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for a repeat customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = false;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.695, totalPrice: 2542.5 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state new customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = true;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.755, totalPrice: 877.5 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state new customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = true;
      const isRepeatCustomer = false;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.74, totalPrice: 2610 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state repeat customer with less than or equal to 1000 gallons', () => {
      const gallonsRequested = 500;
      const isOutOfState = true;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.74, totalPrice: 870 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });

    it('should calculate total price correctly for an out-of-state repeat customer with more than 1000 gallons', () => {
      const gallonsRequested = 1500;
      const isOutOfState = true;
      const isRepeatCustomer = true;

      const totalPrice = PricingModule.calculatePrice(gallonsRequested, isOutOfState, isRepeatCustomer);

      expect(totalPrice).toEqual({ suggestedPricePerGallon: 1.725, totalPrice: 2587.5 }); // Assuming currentPricePerGallon is 1.50 and companyProfitFactor is 0.10
    });
  });
});

////////// AuthToken Tests //////////
dotenv.config({ path: './.env' });

describe('Auth', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {}
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return a 401 error if no token is provided', async () => {
    await Auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Access Denied: No token provided." });
  });

  it('should return a 401 error if an invalid token is provided', async () => {
    req.cookies.token = 'invalidToken';

    await Auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: "Authentication Failed!" });
  });

  it('should return a 401 error if an expired token is provided', async () => {
    const token = jwt.sign({ _id: '1234567890', username: 'testuser' }, process.env.SECRETKEY, { expiresIn: '-1s' });
    req.cookies.token = token;

    await Auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: "Authentication Failed!" });
  });
});
