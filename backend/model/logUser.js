const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logUserSchema = new Schema({
    idUser: {
        type: String
    },
    adminChange: {
        type: String,
        default: null
    },
    user: {
        type: String,
        default: null
    },
    pointChange: {
        type: String,
        default: 0
    },
    log: {
        type: String,
        default: null
    },
    create_at: {
        type: Number,
        default: Date.now()
    }
})
const logUserModel = mongoose.model('logUser', logUserSchema)
module.exports = logUserModel