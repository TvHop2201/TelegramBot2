const axios = require('axios')
require('dotenv').config()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')
const { urlencoded } = require('express')

const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`

class HandleCommand {
    async command(text, chatId, fromId) {
        let commands = [
            {
                "command": 'start',
                "description": "i'm BOT"
            },
            {
                "command": 'hop',
                "description": "Hop command"
            },
            {
                "command": 'time',
                "description": new Date().toString()
            },
            {
                "command": 'weather',
                "description": 'thời tiết hôm nay : '
            },

        ]
        const date = Date.now()

        commands.forEach(async (index) => {
            if (text === index.command) {
                let textEncode = encodeURI(index.description)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: index.description,
                    date: date
                })
            }
        })

        if (text.split(' ')[0] === 'thank') {
            this.handleThankCommand(text, chatId, fromId)
        }
        if (text.split(' ')[0] === 'point') {
            this.handleListCommand(text, chatId)
        }
    }

    async handleThankCommand(text, chatId, fromId111) {
        let [thankCommand, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        const date = Date.now()

        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (data.length === 0) {
                let text = 'không tồn tại người dùng'
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            } else {
                await userModel.findOneAndUpdate({ userName: pointUser }, { point: data.point + 1 })
                await userModel.findOneAndUpdate({ fromId: fromId111 }, { point: point - 1 })
                await pointMessageModel.create({
                    id: data.fromId,
                    message: pointMessage
                })
                let text = `user : ${data.userName} đang có ${data.point + 1}`
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            }

        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng'
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            } else {
                await userModel.findOneAndUpdate({ firstName: pointUser }, { point: data.point + 1 })
                await userModel.findOneAndUpdate({ fromId: fromId111 }, { point: point - 1 })
                await pointMessage.create({
                    id: data.fromId,
                    message: pointMessage
                })
                let text = `user : ${data.firstName} đang có ${data.point + 1}`
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            }
        }

    }
    async handlePointCommand(text, chatId) {
        let [pointCommand, pointUser] = text.split(' ')
        if (!pointUser) {
            let pData = await (await userModel.find().sort({ point: -1 })).limit(10)
            let textOut = ''
            for (const index of pData) {
                textOut = textOut + index.userName + index.firstName + " : " + index.point + "\n"
            }
            let textEncode = encodeURI(textOut)
            await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
            await chatModel.create({
                fromId: 11111111,
                chatId: chatId,
                text: textOut,
                date: date
            })
        }
        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng'
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            } else {
                let data2 = pointMessageModel.find({ id: data.fromId })
                let textOut = ''
                for (const index of data2) {
                    textOut = textOut + '1 point ' + new Date(index.Date).toDateString() + ' : ' + index.message + "\n"
                }
                let textEncode = encodeURI(textOut)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: textOut,
                    date: date
                })
            }

        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng'
                let textEncode = encodeURI(text)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: text,
                    date: date
                })
            } else {
                let data2 = pointMessageModel.find({ id: data.fromId })
                let textOut = ''
                for (const index of data2) {
                    textOut = textOut + '1 point ' + new Date(index.Date).toDateString() + ' : ' + index.message + "\n"
                }
                let textEncode = encodeURI(textOut)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: textOut,
                    date: date
                })
            }
        }
    }
}

module.exports = new HandleCommand()
