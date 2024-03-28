const PricingModule = require("../pricingModule.js")

class FuelController{
    static async getQuote(req, res) {
        try {
            const galRequested = req.body.fuelQuote.gallonsRequested
            const address = req.body.fuelQuote.deliveryAddress
            const date = req.body.fuelQuote.deliveryDate
            const suggested = req.body.fuelQuote.suggestedPrice // Total and suggested should be received from pricing module
            const total = req.body.fuelQuote.totalAmountDue     // rather than frontend later on

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

            // Send fuelReq to DB to update user history
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