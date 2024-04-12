class PricingModule {
    static calculatePrice (gallonsRequested, isOutOfState, isRepeatCustomer) {
        try {
            const currentPricePerGallon = 1.50;
            const locationFactor = isOutOfState ? 0.04 : 0.02;
            const rateHistoryFactor = isRepeatCustomer ? 0.01 : 0;
            const gallonsFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
            const companyProfitFactor = 0.10;
            //Calculate profit margin
            const margin = currentPricePerGallon * (locationFactor - rateHistoryFactor + gallonsFactor + companyProfitFactor);
            //Calculates suggested price per gallon
            const suggestedPricePerGallon = currentPricePerGallon + margin;
            //Calculates total price
            const totalPrice = gallonsRequested * suggestedPricePerGallon;

            return { suggestedPricePerGallon, totalPrice };
        } 
        catch (err) {
            // Log error message
            console.error("Unable to calculate fuel price", err)
            throw new Error("Unable to calculate fuel price");
        }
    }    
}

module.exports = PricingModule