class ProfileController {
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