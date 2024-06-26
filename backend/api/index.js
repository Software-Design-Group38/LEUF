const express = require('express')
const cors = require('cors')
const app = express()
const routers = require("../routes.js")
//const db = require("../database.js")
const mongoose = require('mongoose')
require('dotenv/config')

app.use(express.json())
app.use(cors())
const port = 3001 || process.env.PORT

app.get('/', (req, res) => {
  res.send("Hello")
})

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err))

app.use(routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})