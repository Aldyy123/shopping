const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    field : {
        type: String
    }
})

const model = mongoose.model('Categories', schema)

module.exports = model