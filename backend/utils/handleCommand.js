const axios = require('axios')
require('dotenv').config()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const { pointModel, pointMessageModel } = require('../model/point')

const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`

class HandleCommand {
    async command(text, chatId) {
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

        const fromId = 11111111
        const date = Date.now()

        commands.forEach(async (index) => {
            if (text === index.command) {
                let textEncode = encodeURI(index.description)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: fromId,
                    chatId: chatId,
                    text: index.description,
                    date: date
                })
            }
        })

        if (text.split(' ')[0] === 'thank') {
            this.handleThankCommand(text, chatId)
        }
    }

    async handleThankCommand(text, chatId) {
        let [thank, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        let data = await pointModel.findOne({ user: pointUser })
        if (!data) {
            let pointCreate = await pointModel.create({
                username: pointUser
            })
            await pointMessageModel.create({
                id: pointCreate._id,
                message: pointMessage
            })
        } else {
            await pointModel.findOneAndUpdate({ username: pointUser }, { point: (data.point + 1) })
            await pointMessageModel.create({
                id: data._id,
                message: pointMessage
            })
        }

        let data2 = await pointModel.findOne({ user: pointUser })
        let data3 = await pointMessageModel.find({ id: data2._id }).sort({ _id: -1 }).limit(5)
        let dataOut = ''
        let fromId = 11111111
        let date = Date.now()
        for (const index of data3) {
            dataOut = dataOut + '++1Point  ' + new Date(index.Date).toDateString() + " : " + index.message + '\n';
        }

        dataOut = dataOut + `\n\n Người dùng : ${data2.username} \n Điểm : ${data2.point}`
        let textEncode = encodeURI(dataOut)
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
        await chatModel.create({
            fromId: fromId,
            chatId: chatId,
            text: dataOut,
            date: date
        })
    }
}

module.exports = new HandleCommand()
