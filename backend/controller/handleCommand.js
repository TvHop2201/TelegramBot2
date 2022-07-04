const axios = require('axios')
require('dotenv').config()
const fs = require('fs')

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')

const handlePhoto = require('../utils/handlePhoto')

const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`
const url4 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

class HandleCommand {
    async command(text, chatId, fromId) {
        console.log('command : ', text)
        let commandFull = ['start', 'hop', 'time', 'help', 'thank', 'point', 'gift', 'image', 'weather', 'option', '🎉', '💖', '🌹', '🏆']
        if (commandFull.indexOf(text.split(' ')[0]) === -1) {
            let textA = '<b> Wrong command !!!! </b>'
            this.sendText(textA, chatId)
        }
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
            {
                "command": 'help',
                "description": `<b>Danh Sách Command</b>\n <b>/thank <i> _user _message </i> : Tặng 1 điểm</b>\n <b>/gift <i>_user _point _message </i>: Tặng nhiều điểm</b>`
                    + `\n<b>/point<i> _user</i> : Xem nhật ký cập nhật điểm và message của user</b> \n<b>/point : Xem điểm của top user điểm cao</b>`
                    + `\n<b>/weather : xem thời tiết tại Vinh</b> \n<b>/weather <i>_location</i>: Xem thời tiết tại location</b>`
                    + `\n<b>/option : tặng quà theo option</b>`
            }

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
        if (text.split(' ')[0] === 'option') {
            this.handleOption(text, chatId)
        }
        if (text.split(' ')[0] === '🎉' || text.split(' ')[0] === '💖' || text.split(' ')[0] === '🌹' || text.split(' ')[0] === '🏆') {
            this.handleGiftFlower(text, chatId, fromId)
        }


    }

    async handleThankCommand(text, chatId, fromId111) {
        let [thankCommand, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!!!</b>'
                this.sendText(text, chatId)
            } else {
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point >= 0) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: '1',
                        message: pointMessage
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.userName, 1, pointMessage)
                    this.saveText(text, chatId)
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
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point >= 0) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: '1',
                        message: pointMessage
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.firstName, 1, pointMessage)
                    this.saveText(text, chatId)
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
            let text = '<b>Danh Sách Điểm Các Thành Viên</b>\n\n '
            for (const index of pData) {
                let text1 = index.userName ? ` <b><i>${index.userName}</i></b>` + " - " : ''
                let text2 = index.firstName ? ` <b><i>${index.firstName}</i></b>` + " - " : ''
                let text3 = index.lastName ? ` <b><i>${index.lastName}</i></b>` + " - " : ''
                text = text + text1 + text2 + text3 + " : <b>" + index.point + "</b>\n"
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
                    let text = '<b>message</b>\n'
                    for (const index of data2) {
                        let message = index.message.replace(/(<([^>]+)>)/gi, "")
                        message = message.replace(/</g, "")
                        text = text + 'add : ' + index.pointChange + ' - ' + new Date(index.Date).toLocaleDateString() + ' : ' + message + "\n"
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
                    let text = '<b>message</b>\n'
                    for (const index of data2) {
                        let message = index.message.replace(/(<([^>]+)>)/gi, "")
                        message = message.replace(/</g, "")
                        text = text + 'add : ' + index.pointChange + ' - ' + new Date(index.Date).toLocaleDateString() + ' : ' + message + "\n"
                    }
                    this.sendText(text, chatId)
                }
            }

        }

    }
    async handleGiftCommand(text, chatId, fromId111) {
        let [giftCommand, pointUser, numPoint, ...pointMessage] = text.split(' ')
        numPoint = parseInt(numPoint)
        pointMessage = pointMessage.join(' ')
        if (Number.isNaN(numPoint)) {
            let text = '<b>Wrong point !!!</b>'
            this.sendText(text, chatId)
            return 0;
        }
        if (numPoint > 50) {
            let text = `<b>Không thể tặng hơn 50 điểm </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
            } else {
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point >= 0) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: numPoint,
                        message: pointMessage
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.userName, numPoint, pointMessage)
                    this.saveText(text, chatId)
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
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point >= numPoint) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: numPoint,
                        message: pointMessage
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.firstName, numPoint, pointMessage)
                    this.saveText(text, chatId)
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
            if (data.code === 404) {
                let textOut = '<b>Không có dữ liệu về địa chỉ này </b>'
                this.sendText(textOut, chatId)
            } else {
                let textOut = `Thời Tiết Tại :<i> ${data.data.name}</i> \n Nhiệt Dộ : ${Math.round(data.data.main.temp)}\nTình Trạng : ${data.data.weather[0].description}\nTốc Độ Gió : ${(data.data.wind.speed * 3.6).toFixed(2)} `
                this.sendText(textOut, chatId)
            }
        } else {
            let data = await axios(`https://api.openweathermap.org/data/2.5/weather?q=vinh&appid=${weatherAppid}&lang=vi&units=metric`)
            let textOut = `Thời Tiết Tại : ${data.data.name} \nNhiệt Dộ : ${Math.round(data.data.main.temp)}  \nTình Trạng : ${data.data.weather[0].description} \nTốc Độ Gió : ${(data.data.wind.speed * 3.6).toFixed(2)} `
            this.sendText(textOut, chatId)
        }
    }

    async handleOption(text, chatId) {
        let text1 = encodeURI('MỜi CHỌN !!!! 🎉 🎉 🎉 🎉')
        let option = {
            "keyboard": [[
                `/${encodeURI('🎉')}`, `/${encodeURI('💖')}`, `/${encodeURI('🌹')}`, `/${encodeURI('🏆')}`
            ]]
        }
        option = JSON.stringify(option)
        await axios.get(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${text1}&reply_markup=${option}`)
    }

    async sendGFOptionChoseUser(text, chatId) {
        let text1 = encodeURI(`MỜi CHỌN !!!!  ${text}  ${text} ${text}`)
        let userData = await userModel.find({}, { userName: 1, firstName: 1, lastName: 1 })
        let arrayUser = []
        userData.forEach(index => {
            if (index.userName) {
                arrayUser.push([`/${text} @${index.userName}`])
            } else if (index.firstName) {
                arrayUser.push([`/${text} ${index.firstName}`])
            } else {
                arrayUser.push([`/${text} ${index.lastName}`])
            }
        })

        let option = {
            "keyboard": arrayUser
        }
        option = encodeURI(JSON.stringify(option))
        await axios.get(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${text1}&reply_markup=${option}`)
    }

    async handleGiftFlower(text, chatId, fromId111) {
        let [icon, ...userReceive] = text.split(' ')
        let pointChange, textOut
        if (icon === '🎉') {
            pointChange = 10
            textOut = "Tặng Hoa"
        } else if (icon === '💖') {
            pointChange = 20
            textOut = "Thả Tym"
        } else if (icon === '🌹') {
            pointChange = 30
            textOut = "Tặng Hoa Hồng"
        } else if (icon === '🏆') {
            pointChange = 40
            textOut = "Tặng Cúp"
        }
        userReceive = userReceive.join(' ')
        if (userReceive === '') {
            this.sendGFOptionChoseUser(icon, chatId)
            return
        }
        if (userReceive.charAt(0) === '@') {
            userReceive = userReceive.split('@')[1]
            let data = await userModel.findOne({ userName: userReceive })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
            } else {
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: pointChange,
                        message: icon
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.userName, pointChange, textOut)
                    this.saveText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!!!</b>'
                    this.sendText(text, chatId)
                }
            }
        } else {
            let data = await userModel.findOne({ firstName: userReceive })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
            } else {
                if (data.fromId === fromId111) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.point) {
                    await pointMessageModel.create({
                        idUserReceive: data.fromId,
                        idUserSendGift: fromId111,
                        pointChange: pointChange,
                        message: icon
                    })
                    this.sendGiftPhoto(chatId, fromId111, data.fromId, data.firstName, pointChange, textOut)
                    this.saveText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!! </b>'
                    this.sendText(text, chatId)
                }
            }
        }
    }

    async sendText(text, chatId) {
        let textEncode = encodeURI(text)
        let textBr = text.replace(/\n/g, '<br/>')
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
        await chatModel.create({
            fromId: 11111111,
            chatId: chatId,
            text: textBr,
            date: Date.now()
        })
    }

    async saveText(text, chatId) {
        let textBr = text.replace(/\n/g, '<br/>')
        await chatModel.create({
            fromId: 11111111,
            chatId: chatId,
            text: text,
            date: Date.now()
        })
    }

    async sendGiftPhoto(chatId, fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage) {
        let date = Date.now()
        let fixPointMessage = pointMessage.replace(/(<([^>]+)>)/gi, "")
        fixPointMessage = fixPointMessage.replace(/</g, "")
        await handlePhoto.randomPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, fixPointMessage, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
            })
            .catch(err => console.log(err))
    }

    async getName(fromId) {
        let getName = await userModel.findOne({ fromId: fromId })
        if (!getName) {
            return null
        } else if (getName.userName) {
            return getName.userName
        } else if (getName.firstName) {
            return getName.firstName
        } else if (getName.lastName) {
            return getName.lastName
        }
    }
}

module.exports = new HandleCommand()
