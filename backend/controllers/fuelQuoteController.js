const PricingModule = require("../pricingModule.js")
const { User, UserInfo } = require('../models/userModel.js')
const { FuelQuote } = require('../models/fuelModel.js')

class FuelController{
    static async getQuote(req, res) {
        try {
            const {username, fuelQuote} = req.body    
            const {gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice} = fuelQuote

            if (isNaN(gallonsRequested) || gallonsRequested <= 0){
                return res.status(400).json({ message: "At least 1 gallon must be requested" })
            }

            const user = await User.findOne({ username: username })
            const userInfo = await UserInfo.findOne({_id: user._id})

            const total = PricingModule.calculatePrice(gallonsRequested, userInfo.state != "TX", await FuelQuote.findOne({_id: user._id}))
            
            /*const fuelReq = {
                gallonsRequested: galRequested,
                deliveryAddress: address,
                deliveryDate: date,
                suggestedPrice: suggested,
                totalAmountDue: total
            }*/

            // Send fuelReq to DB to update user history
            //console.log(fuelReq)
            return res.status(200).json({ message: "Fuel quote submitted successfully" })
        }
        catch (err) {
            console.error("Unable to submit fuel quote", err)
            return res.status(500).json({ message: "Unable to submit fuel quote" })
        }
    }

    static async getHistory(req, res) {
        // Get fuel quote history from username in database
        // Return history as array to frontend to prepare for formatting/display
    }
}

module.exports = FuelController