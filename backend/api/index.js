const express = require('express')
const cors = require('cors')
const sql = require('sql')
const app = express()
const port = 3001
//const routers = require("./route.js")

app.use(express.json())
app.use(cors())

app.post('/', (req, res) => {
  res.send(req)
})

app.post("/login", async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  if (!req.body.username || !req.body.password){
    return res.status(400).json({ message: "Username and password are required" })
  }

  // Authenticate username and password in database

  // Temporary return success response status
  return res.status(200).json({ message: "Login successful" })
})

app.post("/register", (req, res) => {
  const {username, password} = req.body

  if (!username || !password){
    return res.status(400).json({ message: "Username and password are required" })
  }

  // Check if username is in database, if not then add it

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

  // Add const registerProfile to database

  // Temporary return success response status
  return res.status(200).json({ message: "Signup successful" })
})

app.put("/profile", (req, res) => {
  try{
    const profileDoc = {
      name: req.body.name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    }
    // Update profile in database and connect it to the username
    console.log(profileDoc)
    return res.status(200).json({ message: "Update successful" })
  }
  catch (err){
    console.error("Unable to update profile")
    return err
  }
})

//app.use("/api/route", routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})