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

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "At least 1 gallon must be requested" });
    });

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
      jest.spyOn(PricingModule, 'calculatePrice').mockReturnValueOnce({
        suggestedPricePerGallon: 1.50,
        totalPrice: 150
      });

      await FuelController.getQuote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Fuel quote submitted successfully" });
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

    it('should return a 400 error if user does not exist', async () => {
      const req = {
        body: {
          username: 'nonexistentuser',
          password: 'validpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      // Mocking database check for non-existent user
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User does not exist" });
    });

    it('should return a 400 error if password does not match', async () => {
      const req = {
        body: {
          username: 'validusername',
          password: 'invalidpassword'
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      // Mocking database check for user with incorrect password
      const userWithIncorrectPassword = {
        username: 'validusername',
        password: 'hashedvalidpassword'
      };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(userWithIncorrectPassword);

      // Mocking bcrypt.compare to return false for incorrect password
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username and password does not match" });
    });

    it('should return a 200 status and success message if login is successful', async () => {
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

      // Mocking database check for user with correct password
      const userWithCorrectPassword = {
        _id: '1234567890',
        username: 'validusername',
        password: await bcrypt.hash('validpassword', 10)
      };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(userWithCorrectPassword);

      // Mocking jwt.sign
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('mockedToken');

      await LoginController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: 'mockedToken',
        user: {
          username: 'validusername'
        }
      });
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

      LoginController.register(req, res);

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

      LoginController.register(req, res);

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

      LoginController.register(req, res);

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

      LoginController.register(req, res);

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

      LoginController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid username" });
    });

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
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
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

      await LoginController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Signup successful" });
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

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ _id: '1234567890' });
      jest.spyOn(UserInfo, 'updateOne').mockResolvedValueOnce();

      await ProfileController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Profile update successful" });
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

  it('should set req.user with decoded token and call next() if a valid token is provided', async () => {
    const token = jwt.sign({ _id: '1234567890', username: 'testuser' }, process.env.SECRETKEY);
    req.cookies.token = token;

    await Auth(req, res, next);

    expect(req.user).toEqual({ _id: '1234567890', username: 'testuser', iat: expect.any(Number), exp: expect.any(Number) });
    expect(next).toHaveBeenCalled();
  });

  it('should return a 401 error if an expired token is provided', async () => {
    const token = jwt.sign({ _id: '1234567890', username: 'testuser' }, process.env.SECRETKEY, { expiresIn: '-1s' });
    req.cookies.token = token;

    await Auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: "Authentication Failed!" });
  });
});
