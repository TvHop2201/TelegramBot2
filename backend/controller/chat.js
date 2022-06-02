const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const chatError = require('../controller/error')

const axios = require('axios')


const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`

class ChatController {
    async getRoom(req, res, next) {
        try {
            let perPage = 10
            let page = req.params.page

            const roomData = await roomModel.find().skip((perPage * page) - perPage).limit(perPage)
            res.json({
                success: true,
                data: roomData
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }

    }
    async getUser(req, res, next) {
        try {
            const userData = await userModel.find()
            res.json({
                success: true,
                data: userData
            })

        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }
    async getUserById(req, res, next) {
        try {
            const userData = await userModel.findOne({ fromId: req.params.id })
            res.json({
                success: true,
                data: userData
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }

    async getChatById(req, res, next) {
        try {
            const chatData = await chatModel.find({ chatId: req.params.id })
            res.json({
                success: true,
                data: chatData
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
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