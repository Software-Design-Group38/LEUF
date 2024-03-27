const router = require("express").Router()
const loginController = require("./controllers/loginController")
const profileController = require("./controllers/profileController")
const fuelQuoteController = require("./controllers/fuelQuoteController")

router.post('/login', loginController.login)
router.post('/register', loginController.register)

router.put('/profile', profileController.updateProfile)

router.post('/fuelform', fuelQuoteController.getQuote)
//router.get('/history', fuelQuoteController.getHistory)

module.exports = router