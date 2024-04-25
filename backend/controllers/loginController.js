class LoginController {
    static async login(req, res) {
        try {
            const { username, password } = req.body
    
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" })
            }
    
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(401).json({ message: "Username or password is incorrect" })
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ message: "Username or password is incorrect" })
            }
    
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRETKEY, { expiresIn: '24h' })
    
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict'
            })
    
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    username: user.username
                }
            })
        } catch (err) {
            console.error("Error during login:", err)
            return res.status(500).json({ message: "Internal service error. Please try again." })
        }
    }
    
    static async register(req, res) {
        try {
            const { username, password } = req.body
    
            // Validation checks
    
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                return res.status(409).json({ message: "Username is already registered" })
            }
    
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                username: username,
                password: hashedPassword
            })
    
            const token = jwt.sign({ _id: newUser._id }, process.env.SECRETKEY, { expiresIn: '24h' })
    
            return res.status(200).json({ message: "Sign up successful", token })
        } catch (err) {
            console.error("Error during registration:", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async logout(req, res) {
        // Clear token
        res.clearCookie('token')
        return res.status(200).json({ message: "Logout successful" })
    }
}

module.exports = LoginController
