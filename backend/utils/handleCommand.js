const axios = require('axios')
require('dotenv').config()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`

class Command {
    async Command(text, chatId) {
        let commands = [
            {
                "command": '/start',
                "description": "i'm BOT"
            },
            {
                "command": '/hop',
                "description": "Hop command"
            },
            {
                "command": '/time',
                "description": new Date().toString()
            }
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
    }
}

module.exports = new Command()
