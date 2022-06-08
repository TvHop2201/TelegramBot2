const axios = require('axios')
require('dotenv').config()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')

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
        commands.forEach(async (index) => {
            if (text === index.command) {
                let textEncode = encodeURI(index.description)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
                await chatModel.create({
                    fromId: 11111111,
                    chatId: chatId,
                    text: index.description,
                    date: Date.now()
                })
            }
        })

        if (text.split(' ')[0] === 'thank') {
            this.handleThankCommand(text, chatId, fromId)
        }
        if (text.split(' ')[0] === 'point') {
            this.handlePointCommand(text, chatId)
        }
        if (text.split(' ')[0] === 'gift') {
            this.handleGiftCommand(text, chatId, fromId)
        }
        if (text.split(' ')[0] === 'image') {
            this.handleImageCommand(text, chatId)
        }
    }

    async handleThankCommand(text, chatId, fromId111) {
        let [thankCommand, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (data.length === 0) {
                let text = 'không tồn tại người dùng'
                this.sendText(text, chatId)
            } else {
                if (data.point <= 1) {
                    await userModel.findOneAndUpdate({ userName: pointUser }, { point: data.point + 1 })
                    await userModel.findOneAndUpdate({ fromId: fromId111 }, { $inc: { point: -1 } })
                    await pointMessageModel.create({
                        id: data.fromId,
                        message: pointMessage
                    })
                    let text = `user : ${data.userName} đang có ${data.point + 1} point`
                    this.sendText(text, chatId)
                } else {
                    let text = 'Không Đủ Số Điểm Để Tặng !!!'
                    this.sendText(text, chatId)
                }
            }

        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng'
                this.sendText(text, chatId)
            } else {
                if (data.point <= 1) {
                    await userModel.findOneAndUpdate({ firstName: pointUser }, { point: data.point + 1 })
                    await userModel.findOneAndUpdate({ fromId: fromId111 }, { $inc: { point: -1 } })
                    await pointMessageModel.create({
                        id: data.fromId,
                        message: pointMessage
                    })
                    let text = `user : ${data.firstName} đang có ${data.point + 1} point`
                    this.sendText(text, chatId)
                } else {
                    let text = 'Không Đủ Số Điểm Để Tặng !!!!'
                    this.sendText(text, chatId)
                }
            }
        }

    }
    async handlePointCommand(text, chatId) {
        let [pointCommand, pointUser] = text.split(' ')
        if (!pointUser) {
            let pData = await userModel.find().sort({ point: -1 }).limit(10)
            let text = ''
            for (const index of pData) {
                text = text + index.userName + " - " + index.firstName + " : " + index.point + "\n"
            }
            this.sendText(text, chatId)
        } else {
            if (pointUser.charAt(0) === '@') {
                pointUser = pointUser.split('@')[1]
                let data = await userModel.findOne({ userName: pointUser })
                if (!data) {
                    let text = 'không tồn tại người dùng'
                    this.sendText(text, chatId)
                } else {
                    let data2 = await pointMessageModel.find({ id: data.fromId }).limit(10)
                    let text = ''
                    for (const index of data2) {
                        text = text + '1 point ' + new Date(index.Date).toLocaleDateString() + ' : ' + index.message + "\n"
                    }
                    this.sendText(text, chatId)
                }

            } else {
                let data = await userModel.findOne({ firstName: pointUser })
                if (!data) {
                    let text = 'không tồn tại người dùng'
                    this.sendText(text, chatId)
                } else {
                    let data2 = await pointMessageModel.find({ id: data.fromId }).limit(15)
                    let text = ''
                    for (const index of data2) {
                        text = text + '1 point ' + new Date(index.Date).toLocaleDateString() + ' : ' + index.message + "\n"
                    }
                    this.sendText(text, chatId)
                }
            }

        }

    }
    async handleGiftCommand(text, chatId, fromId111) {
        let [giftCommand, pointUser, numPoint] = text.split(' ')
        numPoint = parseInt(numPoint)
        if (Number.isNaN(numPoint)) {
            let text = 'Wrong point !!!'
            this.sendText(text, chatId)
            return 0;
        }
        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng !!!'
                this.sendText(text, chatId)
            } else {
                if (data.point >= numPoint) {
                    await userModel.findOneAndUpdate({ userName: pointUser }, { point: data.point + numPoint })
                    await userModel.findOneAndUpdate({ fromId: fromId111 }, { $inc: { point: - numPoint } })
                    let text = `user : ${data.userName} đang có ${data.point + 1} point`
                    this.sendText(text, chatId)
                } else {
                    let text = 'Không Đủ Số Điểm Để Tặng !!!!'
                    this.sendText(text, chatId)
                }
            }
        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = 'không tồn tại người dùng !!!!'
                this.sendText(text, chatId)
            } else {
                if (data.point >= numPoint) {
                    await userModel.findOneAndUpdate({ firstName: pointUser }, { point: data.point + 1 })
                    await userModel.findOneAndUpdate({ fromId: fromId111 }, { $inc: { point: -1 } })
                    let text = `user : ${data.firstName} đang có ${data.point + 1} point`
                    this.sendText(text, chatId)
                } else {
                    let text = 'Không Đủ Số Điểm Để Tặng !!!'
                    this.sendText(text, chatId)
                }
            }
        }

    }
    async handleImageCommand(text, chatId) {
        let textEncode = encodeURI('https://picsum.photos/200/300')
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
    }


    async sendText(text, chatId) {
        let textEncode = encodeURI(text)
        let textBr = text.replaceAll('\n', '<br/>')
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}`)
        await chatModel.create({
            fromId: 11111111,
            chatId: chatId,
            text: textBr,
            date: Date.now()
        })
    }
}

module.exports = new HandleCommand()
