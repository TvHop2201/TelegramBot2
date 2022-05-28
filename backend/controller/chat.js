const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const chatError = require('../controller/error')

const axios = require('axios')

class ChatController {
    async getRoom(req, res) {
        try {
            const roomData = await roomModel.find()
            res.json(roomData)
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }

    }
    async getUser(req, res) {
        try {
            const userData = await userModel.find()
            res.json(userData)

        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }
    async getChatById(req, res) {
        try {
            const chatData = await chatModel.find()
            res.json(chatData)
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }
    async sendChat(req, res) {
        try {
            const messageId = req.body.messageId
            const chatId = req.body.chatId
            const fromId = req.body.fromId
            const text = req.body.text
            const date = new Date()

            await axios.post(`${TelegramApi}/sendMessage?chat_id=${chatId}&text=${text}`)

            await chatModel.create({
                messageId: messageId,
                chatId: chatId,
                fromId: fromId,
                text: text,
                date: date
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }
    }


}


module.exports = new ChatController()