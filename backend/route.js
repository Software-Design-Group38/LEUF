const router = require("express").Router()

  router.post("/register", (req, res) => {
    // Your registration logic here
    res.send("Registration route reached")
  })
  
  // Handler function for the "/login" route
  router.post("/login", (req, res) => {
    // Your login logic here
    res.send("Login route reached")
  })

export default router;