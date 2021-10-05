const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Area', areaSchema)