const jwt = require("jsonwebtoken")
require('dotenv/config')

async function Auth(req, res, next){
    try{
        const token = req.cookies.token
        console.log(token)

        if (!token){
            return res.status(401).json({ message: "Access Denied: No token provided." })
        }

        const decodedToken = jwt.verify(token, process.env.SECRETKEY)

        req.user = decodedToken

        next()
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ err : "Authentication Failed!"})
    }
}

module.exports = Auth