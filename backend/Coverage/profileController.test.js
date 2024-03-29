const ProfileController = require('../controllers/profileController.js');
const app = require('../api/index.js')

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
