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

  // Add username and password to database

  // Temporary return success response status
  return res.status(200).json({ message: "Signup successful" })
})

//app.use("/api/route", routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})