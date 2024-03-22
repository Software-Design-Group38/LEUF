const router = require("express").Router()
const profileController = require("./controllers/profileController")
const fuelQuoteController = require("./controllers/fuelQuoteController")

router.post('/login', profileController.login)
router.post('/register', profileController.createProfile)
router.put('/profile', profileController.updateProfile)

//router.post('/fuelform', fuelQuoteController.getQuote)

module.exports = router