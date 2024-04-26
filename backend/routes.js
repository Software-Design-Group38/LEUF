const router = require("express").Router()
const loginController = require("./controllers/loginController")
const profileController = require("./controllers/profileController")
const fuelQuoteController = require("./controllers/fuelQuoteController")
const Auth = require("./middleware/authToken.jsx")

router.post('/login', loginController.login)
router.post('/register', loginController.register)
router.post('/logout', loginController.logout)

router.put('/profile', profileController.updateProfile)
router.get('/user/:username', profileController.getProfile)

router.post('/fuelform', fuelQuoteController.quoteSubmit)
router.get('/fuelform/:username', fuelQuoteController.getQuote)
router.get('/history/:username', fuelQuoteController.getHistory)

module.exports = router