const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const chatError = require('../controller/error')
const tryCatch = require('../utils/handleTryCatch').handle

const axios = require('axios')
const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`

class ChatController {
    async getRoom(req, res, next) {
        let perPage = 10
        let page = req.params.page

        let [err, roomData] = await tryCatch(
            roomModel.find().skip((perPage * page) - perPage).limit(perPage)
        )
        if (err)
            return res.status(500).json(chatError.error(101, error))
        res.json({
            success: true,
            data: roomData
        })
    }

    async getUser(req, res, next) {
        let [err, userData] = await tryCatch(
            userModel.find()
        )
        if (err)
            return res.status(500).json(chatError.error(101, error))
        res.json({
            success: true,
            data: userData
        })
    }
    async getUserById(req, res, next) {
        let [err, userData] = await tryCatch(
            userModel.findOne({ fromId: req.params.id })
        )
        if (err)
            return res.status(500).json(chatError.error(101, error))
        res.json({
            success: true,
            data: userData
        })
    }

    async getChatById(req, res, next) {
        const [err, chatData] = await tryCatch(
            chatModel.find({ chatId: req.params.id })
        )
        if (err)
            return res.status(500).json(chatError.error(101, error))
        res.json({
            success: true,
            data: chatData
        })
    }

    async getChatUserById(req, res, next) {
        try {
            let perPage = 6
            let page = req.params.page
            const chatData = await chatModel.find({ chatId: req.params.id }).skip((perPage * page) - perPage)
                .sort({ date: -1 }).limit(perPage)
            var result = []
            for (let i = 0; i < chatData.length; i++) {
                const chatUser = await userModel.findOne({ fromId: chatData[i].fromId })
                result.push({ chat: chatData[i], user: chatUser })
            }
            res.json({
                success: true,
                data: result
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }

    async sendChat(req, res, next) {
        try {
            const chatId = req.body.chatId
            const fromId = 11111111
            const text = req.body.text
            const date = Date.now()
            const textEncode = encodeURI(text)
            await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
            const sendData = await chatModel.create({
                fromId: fromId,
                chatId: chatId,
                text: text,
                date: date
            })
            const botUser = await userModel.findOne({ fromId: fromId })
            if (!botUser) {
                await userModel.create({
                    fromId: fromId,
                    firstName: 'Bot'
                })
            }
            res.json({
                success: true,
                data: sendData
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }
}


module.exports = new ChatController()