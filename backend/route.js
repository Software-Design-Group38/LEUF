const router = require("express").Router()

router.post("/login", async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  if (!req.body.username || !req.body.password){
    return res.status(400).json({ message: "Username and password are required" })
  }

  // Authenticate username and password in database
  // If username does not exist in database, return message "Username does not exist"
  // If username exists in database but password incorrect, return message "Username and password does not match"
  try {
    const user = await user.findOne({ where: { username } })

    if (!user) {
      return res.status(404).json({ message: "Username does not exist" })
    }

    const isPasswordValid = await user.validPassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Username and password do not match" })
    }

    // Return success if it passes all verifications
    return res.status(200).json({ message: "Login successful" })
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" })
  }
  // return res.status(200).json({ message: "Login successful" })
    // If username does not exist in database, return message "Username does not exist"
    // If username exists in database but password incorrect, return message "Username and password does not match"

  // Return success if it passes all verifications
  return res.status(200).json({ message: "Login successful" })
})

router.post("/register", (req, res) => {
  const {username, password} = req.body

  if (!username || !password){
    return res.status(400).json({ message: "Username and password are required" })
  }

  // Check if username is in database, if not then add it
  // If username already in database, return message "Username already exists"
    // If username already in database, return message "Username already exists"
  // Check if username and password are valid (are between minLength and maxLength)

  const registerProfile = {
    username: req.body.username,
    password: req.body.password,
    name: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zipcode: null
  }

  console.log(registerProfile)

  // Add const registerProfile to database after validating

  // Return success response status
  return res.status(200).json({ message: "Signup successful" })
})

router.put("/profile", (req, res) => {
  try{
    const profileDoc = {
      name: req.body.name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    }
    
    // Update profile in database and connect it to the username in database
    console.log(profileDoc)
    return res.status(200).json({ message: "Update successful" })
  }
  catch (err){
    console.error("Unable to update profile")
    return err
  }
})

router.post("/fuelform", async (req, res) => {
  console.log(req.body)
  try{
    const {gallonsRequested, deliveryDate, totalAmountDue} = req.body.fuelQuote
    // Grab address1 from database
    const fuelDoc = {
      gallonsRequested: gallonsRequested,
      //address1: address1,
      deliveryDate: deliveryDate,
      totalAmountDue: totalAmountDue, 
    }

    //Save to database
    console.log(fuelDoc)

    return res.status(200).json({ message: "Fuel quote submitted successfully" })
  }
  catch (err){
    console.error("Unable to submit fuel quote", err)
    return res.status(500).json({ message: "Unable to submit fuel quote" })
  }
})

module.exports = router