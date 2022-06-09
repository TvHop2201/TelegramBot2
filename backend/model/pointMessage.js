const mongoose = require('mongoose');
const userModel = require('./user')
const Schema = mongoose.Schema

const pointMessageSchema = new Schema({
    idUserReceive: {
        type: String
    },
    idUserSendGift: {
        type: String
    },
    pointChange: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    Date: {
        type: Number,
        default: Date.now()
    }
})

pointMessageSchema.pre('save', async function (next) {
    if (this) {
        await userModel.findOneAndUpdate({ fromId: this.idUserReceive }, { $inc: { point: + this.pointChange } })
        await userModel.updateOne({ fromId: this.idUserSendGift }, { $inc: { point: - this.pointChange } })
    }
    next()
})

const pointMessageModel = mongoose.model('pointMessage', pointMessageSchema)
module.exports = pointMessageModel