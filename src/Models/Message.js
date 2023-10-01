const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    leaderId: {
        type: String,
        required: true
    },
    supervisorId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Message = mongoose.model('message', messageSchema)
