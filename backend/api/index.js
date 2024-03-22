const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const routers = require("../routes.js")

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Hello")
})

app.use(routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})