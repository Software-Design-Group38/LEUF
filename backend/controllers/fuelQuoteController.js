const PricingModule = require("../pricingModule.js")
const { User, UserInfo } = require('../models/userModel.js')
const { FuelQuote } = require('../models/fuelModel.js')

class FuelController{
    static async getQuote(req, res) {
        try {
            const {username} = req.params
            const {gallonsRequested} = req.query

            if (isNaN(gallonsRequested) || gallonsRequested <= 0){
                return res.status(400).json({ message: "At least 1 gallon must be requested" })
            }

            const user = await User.findOne({ username: username })

            if (!user){
                return res.status(404).json({ error: "User not found" })
            }

            const userInfo = await UserInfo.findOne({_id: user._id})

            const pricingModule = PricingModule.calculatePrice(gallonsRequested, userInfo.state != "TX", await FuelQuote.exists({_id: user._id}))
            const suggestedPrice = pricingModule.suggestedPricePerGallon
            const totalAmountDue = pricingModule.totalPrice
        
            return res.status(200).json({ suggestedPrice, totalAmountDue, message: "Fuel quote GET success" })
        }
        catch (err) {
            console.error("Unable to GET fuel quote", err)
            return res.status(500).json({ message: "Unable to GET fuel quote" })
        } 
    }

    static async quoteSubmit(req, res) {
        try {
            const {username, fuelQuote} = req.body    
            const {gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalPrice} = fuelQuote
            const deliveryAddressStr = `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state}`

            if (isNaN(gallonsRequested) || gallonsRequested <= 0){
                return res.status(400).json({ message: "At least 1 gallon must be requested" })
            }
            if (deliveryAddress == ""){
                return res.status(400).json({ error: "Invalid delivery address" })
            }
            if (isNaN(suggestedPrice)){
                return res.status(400).json({ message: "Invalid suggested price." })
            }
            if (isNaN(totalPrice)){
                return res.status(400).json({ message: "Invalid tota price." })
            }

            const user = await User.findOne({ username: username })

            if (!user){
                return res.status(404).json({ error: "User not found" })
            }

            // Send fuelReq to DB to update user history
            await FuelQuote.updateOne({
                _id: user._id
            }, {
                $push: {
                    fuelInfo: {
                        galReq: gallonsRequested,
                        address: deliveryAddressStr,
                        date: deliveryDate,
                        suggestedPrice: suggestedPrice,
                        total: totalPrice
                    }
                }
            }, { upsert: true })

            return res.status(200).json({ message: "Fuel quote submitted successfully" })
        }
        catch (err) {
            console.error("Unable to submit fuel quote", err)
            return res.status(500).json({ message: "Unable to submit fuel quote" })
        } 
    }

    static async getHistory(req, res) {
        try {
            // Get fuel quote history from username in database
            const user = await User.findOne({ username: req.params.username })
            const fuelHistory = await FuelQuote.findOne({ _id: user._id })
            // Return history as array to frontend to prepare for formatting/display
            return res.status(200).json({ fuelHistory, message: "User history found" })
        } catch (err) {
            return res.status(500).json({error: err.message})
        }   
    }
}

module.exports = FuelController
