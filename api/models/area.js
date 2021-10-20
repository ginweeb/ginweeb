const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    area: {type: String, required: true, unique: true},
    importance: {type: Number, required: true},
})

module.exports = mongoose.model('Area', areaSchema)