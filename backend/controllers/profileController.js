const { User, UserInfo } = require('../models/userModel.js')

class ProfileController {
    static async updateProfile(req, res) {
        try {
            const { username, data } = req.body
            const { name, address1, address2, city, state, zipcode } = data

            // Validate all const if valid
            if (!isNaN(name) || name == "" || name.length > 50){
                return res.status(500).json({ error: "Invalid name" })
            }
            if (address1 == "" || address1.length > 100){
                return res.status(500).json({ error: "Invalid address 1" })
            }
            if (address2.length > 100){
                return res.status(500).json({ error: "Invalid address 2" })
            }
            if (city == "" || city.length > 100){
                return res.status(500).json({ error: "Invalid city" })
            }
            if (state == "" || state.length != 2){
                return res.status(500).json({ error: "Invalid state code" })
            }
            if (zipcode.length < 5 || zipcode.length > 9 || isNaN(zipcode) || zipcode == ""){
                return res.status(500).json({ error: "Invalid zipcode" })
            }

            // Update profileInfo to clientUsername in DB and return success
            const user = await User.findOne({ username: username })
            if (!user){
                return res.status(404).json({ error: "User not found" })
            }

            await UserInfo.updateOne({ _id: user._id }, { $set: data }, { upsert: true })
            return res.status(200).json({ message: "Profile update successful" })
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username })
            const userInfo = await UserInfo.findOne({ _id: user._id })

            if (!userInfo){
                return
            }

            return res.status(200).json({ userInfo, message: "User found" })
        } catch (err) {
            return res.status(500).json({error: err.message})
        }
    }
}

module.exports = ProfileController