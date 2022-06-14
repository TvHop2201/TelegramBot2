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
                "description": "<code> hop</code> "
            },
            {
                "command": 'time',
                "description": new Date().toDateString()
            },

        ]
        commands.forEach(async (index) => {
            if (text === index.command) {
                let textEncode = encodeURI(index.description)
                await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
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
        if (text.split(' ')[0] === 'weather') {
            this.handleWeatherCommand(text, chatId)
        }
    }

    async handleThankCommand(text, chatId, fromId111) {
        let [thankCommand, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (data.length === 0) {
                let text = '<b>không tồn tại người dùng !!!!</b>'
                this.sendText(text, chatId)
            } else {
                if (data.point >= 1) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: '1',
                        message: pointMessage
                    })
                    let text = `<b>user : ${data.userName} đang có ${data.point + 1} point</b>`
                    this.sendText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!!</b>'
                    this.sendText(text, chatId)
                }
            }

        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!!!</b>'
                this.sendText(text, chatId)
            } else {
                if (data.point >= 1) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: '1',
                        message: pointMessage
                    })
                    let text = `<b>user : ${data.firstName} đang có ${data.point + 1} point</b>`
                    this.sendText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!!!</b>'
                    this.sendText(text, chatId)
                }
            }
        }

    }
    async handlePointCommand(text, chatId) {
        let [pointCommand, pointUser] = text.split(' ')
        if (!pointUser) {
            let pData = await userModel.find().sort({ point: -1 }).limit(10)
            let text = '<b>Danh Sách Điểm Các Thành Viên</b>\n '
            for (const index of pData) {
                text = text + `<b>${index.userName}</b>` + " - " + index.firstName + " : " + index.point + "\n"
            }
            this.sendText(text, chatId)
        } else {
            if (pointUser.charAt(0) === '@') {
                pointUser = pointUser.split('@')[1]
                let data = await userModel.findOne({ userName: pointUser })
                if (!data) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    this.sendText(text, chatId)
                } else {
                    let data2 = await pointMessageModel.find({ idUserReceive: data.fromId }).limit(10)
                    let text = '<b>message</b></br>'
                    for (const index of data2) {
                        text = text + index.pointChange + new Date(index.Date).toLocaleDateString() + ' : ' + index.message + "\n"
                    }
                    this.sendText(text, chatId)
                }

            } else {
                let data = await userModel.findOne({ firstName: pointUser })
                if (!data) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    this.sendText(text, chatId)
                } else {
                    let data2 = await pointMessageModel.find({ idUserReceive: data.fromId }).limit(15)
                    let text = '<b>message</b></br>'
                    for (const index of data2) {
                        text = text + 'add : ' + index.pointChange + new Date(index.Date).toLocaleDateString() + ' : ' + index.message + "\n"
                    }
                    this.sendText(text, chatId)
                }
            }

        }

    }
    async handleGiftCommand(text, chatId, fromId111) {
        let [giftCommand, pointUser, numPoint, pointMessage] = text.split(' ')
        numPoint = parseInt(numPoint)
        if (Number.isNaN(numPoint)) {
            let text = '<b>Wrong point !!!</b>'
            this.sendText(text, chatId)
            return 0;
        }
        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
            } else {
                if (data.point >= numPoint) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: numPoint,
                        message: pointMessage
                    })
                    let text = `<b>user : ${data.userName} đang có ${data.point + 1} point <b/>`
                    this.sendText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!!!</b>'
                    this.sendText(text, chatId)
                }
            }
        } else {
            let data = await userModel.findOne({ firstName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
            } else {
                if (data.point >= numPoint) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: numPoint,
                        message: pointMessage
                    })
                    let text = `<b>user : ${data.firstName} đang có ${data.point + numPoint} point</b>`
                    this.sendText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!! </b>'
                    this.sendText(text, chatId)
                }
            }
        }

    }
    async handleImageCommand(text, chatId) {
        let textEncode = encodeURI('aaa\nhttps://placeimg.com/640/480')
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
    }
    async handleWeatherCommand(text, chatId) {
        let [weatherCommand, ...location] = text.split(' ')
        const weatherAppid = 'b1ac492954c5e04bdb2ff86ca85b8de7';
        if (location.length !== 0) {
            location = encodeURI(location.join(' '));
            let data = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAppid}&lang=vi&units=metric`)
            if (data.cod === 404) {
                let textOut = '<b>Không có dữ liệu về địa chỉ này </b>'
                this.sendText(textOut, chatId)
            } else {
                let textOut = `Thời Tiết Tại :<i> ${data.data.name}</i> </br> Nhiệt Dộ : ${Math.round(data.data.main.temp)}</br>Tình Trạng : ${data.data.weather[0].description}</br>Tốc Độ Gió : ${(data.data.wind.speed * 3.6).toFixed(2)} `
                this.sendText(textOut, chatId)
            }

        } else {
            let data = await axios(`https://api.openweathermap.org/data/2.5/weather?q=vinh&appid=${weatherAppid}&lang=vi&units=metric`)
            let textOut = `Thời Tiết Tại : ${data.data.name} \nNhiệt Dộ : ${Math.round(data.data.main.temp)}  \nTình Trạng : ${data.data.weather[0].description} \nTốc Độ Gió : ${(data.data.wind.speed * 3.6).toFixed(2)} `
            this.sendText(textOut, chatId)
        }
    }


    async sendText(text, chatId) {
        let textEncode = encodeURI(text)
        let textBr = text.replaceAll('\n', '<br/>')
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
        await chatModel.create({
            fromId: 11111111,
            chatId: chatId,
            text: textBr,
            date: Date.now()
        })
    }
}

module.exports = new HandleCommand()
