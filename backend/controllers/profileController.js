class ProfileController {
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
            const user = await user.findOne({ where: { username } })
            if (!user) {
                return res.status(404).json({ message: "Username does not exist" })
            }

            const isPasswordValid = await user.validPassword(password)
            if (!isPasswordValid) {
            return res.status(401).json({ message: "Username and password do not match" })
            }

            return res.status(200).json({ message: "Login successful" })
        }
        catch (err) {
            console.error("Error during login:", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async createProfile(req, res) {
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
            const user = await user.findOne({ where: { username } })
            if (user) {
                return res.status(409).json({ message: "User already exists" })
            }

            const registerProfile = {
                username: username,
                password: password,
                name: null,
                address1: null,
                address2: null,
                city: null,
                state: null,
                zipcode: null
            }
            // Add registerProfile into DB then return

            return res.status(200).json({ message: "Signup successful" })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async updateProfile(req, res) {
        try {
            const clientUsername = req.body.username
            const clientName = req.body.name
            const clientAddress1 = req.body.address1
            const clientAddress2 = req.body.address2
            const clientCity = req.body.city
            const clientState = req.body.state
            const clientZipcode = req.body.zipcode

            // Validate all const if valid
            if (!isNaN(clientName) || clientName == "" || clientName.length > 50){
                return res.status(500).json({ error: "Invalid name" })
            }
            if (clientAddress1 == "" || clientAddress2.length > 100){
                return res.status(500).json({ error: "Invalid address 1" })
            }
            if (clientAddress2.length > 100){
                return res.status(500).json({ error: "Invalid address 2" })
            }
            if (clientCity == "" || clientCity.length > 100){
                return res.status(500).json({ error: "Invalid city" })
            }
            if (clientState == "" || clientState.length != 2){
                return res.status(500).json({ error: "Invalid state code" })
            }
            if (clientZipcode.length < 5 || clientZipcode.length > 9 || isNaN(clientZipcode) || clientZipcode == ""){
                return res.status(500).json({ error: "Invalid zipcode" })
            }
            // If passes all validation, set up profileInfo to prepare to update to DB
            const profileInfo = {
                name: clientName,
                address1: clientAddress1,
                address2: clientAddress2,
                city: clientCity,
                state: clientState,
                zipcode: clientZipcode
            }
            // Update profileInfo to clientUsername in DB and return success
            console.log(profileInfo)
            return res.status(200).json({ message: "Update successful" })
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = ProfileController