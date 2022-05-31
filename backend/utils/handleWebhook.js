const axios = require('axios')

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

class HandleWebhook {
    async webHook(datas) {
        for (const data of datas) {
            if (!data.edited_message) {
                const messageId = `${data.message.message_id}_${data.message.chat.id}`
                const chatId = data.message.chat.id
                const fromId = data.message.from.id
                const isBot = data.message.from.is_bot
                const text = data.message.text
                const date = data.message.date

                const firstName = data.message.chat.first_name
                const lastName = data.message.chat.last_name

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
                            lastName: lastName
                        })
                    }
                }
            } else {
                const textEdit = data.edited_message.text
                const messageIdEdit = `${data.edited_message.message_id}_${data.edited_message.chat.id}`
                await chatModel.findOneAndUpdate({ messageId: messageIdEdit }, {
                    $set: { text: textEdit }
                })
            }
        }
    }

}
module.exports = new HandleWebhook