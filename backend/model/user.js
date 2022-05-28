const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fromId: {
        type: Number,
        required: true,
        default: null
    },
    isBot: {
        type: Boolean,
        default: true,
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel