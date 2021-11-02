const mongoose = require('mongoose');

const receiptSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: String, required: true},
    date: {type: String, required: true},
    area: {type: String, required: true},
    price: {type: Number, required: true}
})

module.exports = mongoose.model('Receipt', receiptSchema)