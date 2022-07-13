const axios = require('axios')

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const roomModel = require('../model/room')

const handleCommand = require('../controller/handleCommand')
const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`
class HandleWebhook {
    async webHook(datas) {
        try {
            for (const data of datas) {
                if (!data.edited_message) {
                    const chatId = data.message.chat.id
                    const fromId = data.message.from.id
                    const isBot = data.message.from.is_bot
                    const text = data.message.text
                    const userName = data.message.from.username

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
                        let name
                        if (userName) {
                            name = userName
                        } else if (firstName) {
                            name = firstName
                        } else if (lastName) {
                            name = lastName
                        }
                        let newUserText = `<b> Xin chào bạn mới ${name} </b>`
                        let textEncode = encodeURI(newUserText)
                        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
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
                    console.log(textEdit)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new HandleWebhook