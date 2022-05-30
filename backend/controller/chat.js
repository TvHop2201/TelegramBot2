const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const chatError = require('../controller/error')

const axios = require('axios')

class ChatController {
    async getRoom(req, res) {
        try {
            const roomData = await roomModel.find()
            res.json({
                success: true,
                data: roomData
            })
        } catch (error) {
            res.status(500).json(chatError.error(101, error))
        }

    }
    async getUser(req, res) {
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
    async getUserById(req, res) {
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

    async getChatById(req, res) {
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

    async getChatUserById(req, res) {
        try {
            const chatData = await chatModel.find({ chatId: req.params.id })
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

    async sendChat(req, res) {
        try {
            const messageId = req.body.messageId
            const chatId = req.body.chatId
            const text = req.body.text
            const date = new Date()

            await axios.post(`${TelegramApi}/sendMessage?chat_id=${chatId}&text=${text}`)

            const sendData = await chatModel.create({
                messageId: messageId,
                chatId: chatId,
                text: text,
                date: date
            })
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