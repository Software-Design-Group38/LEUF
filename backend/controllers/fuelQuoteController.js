const PricingModule = require("../pricingModule.js")

class FuelController{
    static async getQuote(req, res) {
        try {
            const galRequested = req.body.gallonsRequested
            const address = req.body.deliveryAddress
            const date = req.body.deliveryDate
            const suggested = req.body.suggestedPrice
            const total = req.body.totalAmountDue

            if (isNaN(galRequested) || galRequested <= 0){
                return res.status(400).json({ message: "At least 1 gallon must be requested" })
            }

            const fuelReq = {
                gallonsRequested: galRequested,
                deliveryAddress: address,
                deliveryDate: date,
                suggestedPrice: suggested,
                totalAmountDue: total
            }

            // Send fuelReq to Pricing Module to determine pricing
            console.log(fuelReq)
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