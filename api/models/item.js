const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    one_price: {type: Number, required: true},
    vnt: {type: Number, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    total: {type: Number, required: true},
    receipt: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Item', itemSchema)