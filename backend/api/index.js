const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const routers = require("../routes.js")
const db = require("../database.js")
dotenv.config()

app.use(express.json())
app.use(cors())
const port = 3001 || process.env.PORT

app.get('/', (req, res) => {
  res.send("Hello")
})

db.connect((err) => {
  if (err){
    console.error("Database connection failed: " + err.stack)
    return
  }
  else{
    console.log("Connected to database")
  }
})

app.use(routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})