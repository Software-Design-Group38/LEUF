const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../database.js")
const mongoose = require("mongoose")
const { User } = require("../models/userModel.js")

class LoginController {
    static async login(req, res) {
        try{
            const username = req.body.username
            const password = req.body.password

            if (!username || !password){
                return res.status(400).json({ message: "Username and password are required" })
            }

            // Conduct other validations such as username/password lengths
            if (username.length < 4 || username.length > 20){
                return res.status(500).json({ error: "Invalid username" })
            }
            if (password.length < 8 || password.length > 30){
                return res.status(500).json({ error: "Invalid username" })
            }

            // Check if username and password are in database; return status; user does not exist if not in DB
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: "User does not exist" })
            }

            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({_id: user._id}, "secretkey123", {
                    expiresIn: '24h',
                })

                return res.status(200).json({
                    message: "Login successful",
                    token,
                    user: {
                        username: user.username
                    }
                })
            }
            else{
                return res.status(400).json({ message: "Username and password does not match" })
            }
            
            //return res.status(200).json({ message: "Login successful" }) // Temporary return
        }
        catch (err) {
            console.error("Error during login:", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async register(req, res) {
        try {
            const username = req.body.username
            const password = req.body.password

            if (!username || !password){
                return res.status(400).json({ message: "Username and password are required" })
            }

            // Validate username/password lengths
            if (username.length < 4 || username.length > 20){
                return res.status(500).json({ error: "Invalid username" })
            }
            if (password.length < 8 || password.length > 30){
                return res.status(500).json({ error: "Invalid username" })
            }

            // Check if username already exists in database, if so, return status/msg Username already exists
            const user = await User.findOne({ username: username })
            if (user) {
                return res.status(409).json({ message: "User already exists" })
            }
            const hashedPW = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                username: username,
                password: hashedPW,
            })
            
            const token = jwt.sign({_id: newUser._id}, "secretkey123", {
                expiresIn: '24h',
            })

            return res.status(200).json({ message: "Signup successful", token })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async logout(req, res) {
        // Clear token
        
        return res.status(200).json({ message: "Logout successful" })
    }
}

module.exports = LoginController