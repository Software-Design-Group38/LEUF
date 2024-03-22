class ProfileController {
    static async login(req, res) {
        try{
            const username = req.body.username
            const password = req.body.password

            if (!username || !password){
                return res.status(400).json({ message: "Username and password are required" })
            }

            // Conduct other validations such as username/password lengths

            // Check if username and password are in database; return status 400; user does not exist if not in DB

            // If in DB, check if username and password matches and return status/msg accordingly
            return res.status(200).json({ message: "Login successful" })
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async createProfile(req, res) {
        try {
            const username = req.body.username
            const password = req.body.password

            // Validate username/password lengths

            // Check if username already exists in database, if so, return status/msg Username already exists

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
            res.status(500).json({ error: err.message })
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
            // If valid, set up profileInfo to prepare to update to DB
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

            res.json({ status: "success" })
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = ProfileController