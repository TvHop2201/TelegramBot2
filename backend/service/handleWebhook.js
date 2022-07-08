const axios = require('axios')

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const handleCommand = require('../controller/handleCommand')

class HandleWebhook {
    async webHook(datas) {
        for (const data of datas) {
            if (!data.edited_message) {
                const chatId = data.message.chat.id
                const fromId = data.message.from.id
                const isBot = data.message.from.is_bot
                const text = data.message.text
                const userName = data.message.from.username
                const date = Date.now()

                const firstName = data.message.from.first_name
                const lastName = data.message.from.last_name


                const data3 = await userModel.findOne({ fromId: fromId })
                if (!data3) {
                    await userModel.create({
                        fromId: fromId,
                        isBot: isBot,
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName
                    })
                } else {
                    if (data3.userName !== userName) {
                        await userModel.updateOne({ fromId: fromId }, { userName: userName })
                    }
                    if (data3.firstName !== firstName) {
                        await userModel.updateOne({ fromId: fromId }, { firstName: firstName })
                    }
                    if (data3.lastName !== lastName) {
                        await userModel.updateOne({ fromId: fromId }, { lastName: lastName })
                    }
                }

                if (text[0] === '/') {
                    let [a, ...textNew] = text.split('/')
                    handleCommand.command(textNew.join("/"), chatId, fromId)
                }


            } else {
                const textEdit = data.edited_message.text
                //const messageIdEdit = `${data.edited_message.message_id}_${data.edited_message.chat.id}`
                console.log(textEdit)
                // await chatModel.findOneAndUpdate({ messageId: messageIdEdit }, {
                //     $set: { text: textEdit }
                // })
            }
        }

    }

}
module.exports = new HandleWebhook