const axios = require('axios')
require('dotenv').config()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const handleCommand = require('./handleCommand')


const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`

exports.fetchApi = async () => {
    const result = await axios.get(telegramBot)
    const datas = result.data.result

    for (const data of datas) {
        try {
            if (!data.edited_message) {
                const messageId = `${data.message.message_id}_${data.message.chat.id}`
                const chatId = data.message.chat.id
                const fromId = data.message.from.id
                const isBot = data.message.from.is_bot
                const text = data.message.text
                const userName = data.message.from.username
                const date = Date.now()

                const firstName = data.message.from.first_name
                const lastName = data.message.from.last_name

                const type = data.message.chat.type
                const title = data.message.chat.title ? data.message.chat.title : null


                const data1 = await chatModel.findOne({ messageId: messageId })
                if (!data1) {
                    await chatModel.create({
                        messageId: messageId,
                        chatId: chatId,
                        fromId: fromId,
                        date: date,
                        text: text
                    })
                    const data2 = await roomModel.findOne({ chatId: chatId })
                    if (!data2) {
                        await roomModel.create({
                            chatId: chatId,
                            title: title,
                            firstName: firstName,
                            lastName: lastName,
                            type: type
                        })
                    }
                    const data3 = await userModel.findOne({ fromId: fromId })
                    if (!data3) {
                        await userModel.create({
                            fromId: fromId,
                            isBot: isBot,
                            firstName: firstName,
                            lastName: lastName,
                            userName: userName
                        })
                    }

                    if (text.charAt(0) === '/') {
                        let textNew = text.split('/')
                        handleCommand.command(textNew[1], chatId, fromId)
                    }
                }

            } else {
                const textEdit = data.edited_message.text
                const messageIdEdit = `${data.edited_message.message_id}_${data.edited_message.chat.id}`
                await chatModel.findOneAndUpdate({ messageId: messageIdEdit }, {
                    $set: { text: textEdit }
                })
            }

        } catch (error) {
            console.log(error)
        }

    }


}
