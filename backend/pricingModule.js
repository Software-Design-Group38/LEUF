class PricingModule {
    static async calculatePrice (gallonsRequested, pricePerGallon, profitMargin) {
        //Calculate total price before profit
        try {
            let totalBeforeProfit = gallonsRequested * pricePerGallon;

            //Calculate profit margin
            let totalPrice = totalBeforeProfit * (1 + profitMargin / 100);
            return totalPrice;
        } 
        catch (err) {
            console.error("Unable to calculate fuel price", err)
            return res.status(500).json({ message: "Unable to calculate fuel price" })
        }
    }
    //Do we need to return this info anywhere else?
}

module.exports = PricingModule
