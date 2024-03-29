const LoginController = require('../controllers/loginController.js');
const app = require('../api/index.js')

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