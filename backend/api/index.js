const express = require('express')
const cors = require('cors')
const sql = require('sql')
const app = express()
const port = 3001
const routers = require("../route.js")

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Hello")
})

app.use(routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})