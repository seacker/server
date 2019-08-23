const mongoose = require('mongoose')

const blockSchema = new mongoose.Schema({
    name: String,
})

const Block = mongoose.model('Block', blockSchema)

module.exports = Block