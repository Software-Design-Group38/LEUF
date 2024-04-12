const mongoose = require('mongoose')

const fuelQuoteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fuelInfo: [{
        galReq: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        suggestedPrice: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true,
        },
    }]
})

const FuelQuote = mongoose.model('FuelQuote', fuelQuoteSchema, 'fuelHistory')

module.exports = { FuelQuote }