const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({ 
    blockName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block',
        required: [true, 'Block name can not be empty']
    },
    index: String,
    taker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat