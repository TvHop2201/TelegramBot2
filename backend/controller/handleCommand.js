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
        let commandFull = ['time', 'help', 'thank', 'point', 'gift']
        if (commandFull.indexOf(text.split(' ')[0]) === -1) {
            let textA = '<b> Wrong command !!!! </b>'
            this.sendText(textA, chatId)
        }


        if (text.split(' ')[0] === 'help') {
            let text1 = `<b>Danh Sách Command</b>\n <b>/thank <i> _user _point "_message" </i> : Tặng điểm</b>`
                + `\n<b>/point<i> _user</i> : Xem nhật ký cập nhật điểm và message của user</b> \n<b>/point : Xem điểm của top user điểm cao</b>`
            this.sendText(text1, chatId)
        }
        if (text.split(' ')[0] === 'time') {
            let text1 = new Date().toLocaleString()
            this.sendText(text1, chatId)
        }
        if (text.split(' ')[0] === 'thank') {
            this.handleThankCommand(text, chatId, fromId)
        }
        if (text.split(' ')[0] === 'point') {
            this.handlePointCommand(text, chatId)
        }
        if (text.split(' ')[0] === 'gift') {
            this.handleGiftCommand(text, chatId, fromId)
        }

    }

    async handleThankCommand(text, chatId, fromIdsend) {
        let [minPoint, maxPoint] = [15, 150]
        let [text1, message] = text.split('"')
        let [thank, userReceive, pointChange] = text1.split(' ')
        //xử lý đầu vào
        if (!pointChange) {
            pointChange = minPoint
        }
        pointChange = parseInt(pointChange)
        if (Number.isNaN(pointChange)) {
            let text = '<b>Wrong point !!!</b>'
            this.sendText(text, chatId)
            return 0;
        }
        if (pointChange > maxPoint) {
            let text = `<b>Không thể tặng hơn 150 điểm </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (pointChange < minPoint) {
            let text = `<b>Không thể tặng dưới 15 điểm </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (!message) {
            message = ''
        }

        console.log('thank : ', thank)
        console.log('userReceive : ', userReceive)
        console.log('poitntChange : ', pointChange)
        console.log('message : ', message)

        //check điểm của bot
        let botPoint = await userModel.findOne({ fromId: 11111111 }, { point: 1 })
        if (botPoint.point <= 1) {
            let text = `<b>Bot Đã Hết Số điểm Để Gửi!!!!</b>`
            this.sendText(text, chatId)
            return 0
        }

        //trường hợp là userName
        if (userReceive.charAt(0) === '@') {
            userReceive = userReceive.split('@')[1]
            let dataUN = await userModel.findOne({ userName: userReceive })
            if (!dataUN) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
                return 0
            } else {
                if (dataUN.fromId === 11111111) {
                    let text = `<b>không thể gửi điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                if (dataUN.fromId === fromIdsend) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                await pointMessageModel.create({
                    idUserReceive: dataUN.fromId,
                    idUserSendGift: fromIdsend,
                    pointChange: pointChange,
                    message: message
                })
                this.sendThankPhoto(chatId, fromIdsend, dataUN.fromId, dataUN.userName, pointChange, message)
                this.saveText(text, chatId)
                return 0
            }
        } else {
            if (userReceive.search("_")) {
                userReceive = userReceive.split('_').join(' ')
            }
            let dataFN = await userModel.findOne({ firstName: userReceive })
            console.log(dataFN)
            if (!dataFN) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
                return 0
            } else {
                if (dataFN.fromId === 11111111) {
                    let text = `<b>không thể gửi điểm cho Bot!!!!</b>`
                    console.log(text)
                    this.sendText(text, chatId)
                    return 0
                }
                if (dataFN.fromId === fromIdsend) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    console.log(text)
                    this.sendText(text, chatId)
                    return 0
                }
                //gửi
                await pointMessageModel.create({
                    idUserReceive: dataFN.fromId,
                    idUserSendGift: fromIdsend,
                    pointChange: pointChange,
                    message: message
                })
                this.sendThankPhoto(chatId, fromIdsend, dataFN.fromId, dataFN.userName, pointChange, message)
                this.saveText(text, chatId)
                return 0
            }
        }
    }

    async handleThankCommand2(text, chatId, fromId111) {
        let [thankCommand, pointUser, ...pointMessage] = text.split(' ')
        pointMessage = pointMessage.join(' ')

        let botPoint = await userModel.findOne({ fromId: 11111111 }, { point: 1 })
        if (botPoint.point <= 1) {
            let text = `<b>Bot Đã Hết Số điểm Để Gửi!!!!</b>`
            this.sendText(text, chatId)
            return 0
        }

        if (pointUser.charAt(0) === '@') {
            pointUser = pointUser.split('@')[1]
            let data = await userModel.findOne({ userName: pointUser })
            if (!data) {
                let text = '<b>không tồn tại người dùng !!!!</b>'
                this.sendText(text, chatId)
            } else {
                if (data.fromId === 11111111) {
                    let text = `<b>không thể tặng điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.fromId === fromId111) {
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
                    this.sendThankPhoto(chatId, fromId111, data.fromId, data.userName, 1, pointMessage)
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
                if (data.fromId === 11111111) {
                    let text = `<b>không thể tặng điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.fromId === fromId111) {
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
                    this.sendThankPhoto(chatId, fromId111, data.fromId, data.firstName, 1, pointMessage)
                    this.saveText(text, chatId)
                } else {
                    let text = '<b>Không Đủ Số Điểm Để Tặng !!!!</b>'
                    this.sendText(text, chatId)
                }
            }
        }

    }

    async handlePointCommand(text, chatId) {
        let [pointCM, userView] = text.split(' ')
        if (userView === 'Bot') {
            let text = '<b>Không Thể Xem Điểm Của Bot !!! </b>'
            this.sendText(text, chatId)
            return 0
        }
        if (!userView) {
            let listData = await userModel.find({ fromId: { $ne: 11111111 } }).sort({ point: -1 }).limit(10)
            let listUser = []
            listData.forEach(index => {
                let text = {
                    user: index.userName ? index.userName : `${index.firstName} ${index.lastName}`,
                    point: index.point
                }
                listUser.push(text)
            })
            this.sendListPointPhoto(listUser, chatId)
        } else {
            if (userView.charAt(0) === '@') {
                userView = userView.split('@')[1]
                let dataUN = await userModel.findOne({ userName: userView }, { point: 1, fromId: 1 })
                if (!dataUN) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    console.log(text)
                    this.sendText(text, chatId)
                    return 0
                }
                let dataMessage = await pointMessageModel.find({ idUserReceive: dataUN.fromId }, { pointChange: 1, message: 1, _id: 0 }).limit(5).sort({ _id: -1 })
                let outData = {
                    fromId: dataUN.fromId,
                    userName: userView,
                    point: dataUN.point,
                    message: dataMessage
                }
                this.sendUserPointPhoto(outData, chatId)

            } else {
                if (userView.search("_")) {
                    userView = userView.split("_").join(" ")
                }
                let dataFN = await userModel.findOne({ firstName: userView }, { point: 1, fromId: 1 })
                if (!dataFN) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    this.sendText(text, chatId)
                    return 0
                }
                let dataMessage = await pointMessageModel.find({ idUserReceive: dataFN.fromId }, { pointChange: 1, message: 1, _id: 0 }).limit(5).sort({ _id: -1 })
                let outData = {
                    fromId: dataFN.fromId,
                    userName: userView,
                    point: dataFN.point,
                    message: dataMessage
                }
                this.sendUserPointPhoto(outData, chatId)

            }
        }

    }

    async handlePointCommand2(text, chatId) {
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
        let botPoint = await userModel.findOne({ fromId: 11111111 }, { point: 1 })
        if (botPoint.point <= 1) {
            let text = `<b>Bot Đã Hết Số điểm Để Gửi!!!!</b>`
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
                if (data.fromId === 11111111) {
                    let text = `<b>không thể tặng điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.fromId === fromId111) {
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
                    this.sendThankPhoto(chatId, fromId111, data.fromId, data.userName, numPoint, pointMessage)
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
                if (data.fromId === 11111111) {
                    let text = `<b>không thể tặng điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                } else if (data.fromId === fromId111) {
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
                    this.sendThankPhoto(chatId, fromId111, data.fromId, data.firstName, numPoint, pointMessage)
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

    async sendThankPhoto(chatId, fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage) {
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

    async sendListPointPhoto(listUser, chatId) {
        let date = Date.now()
        await handlePhoto.mergeListPoint(listUser, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/PointListand${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/PointListand${date}.jpg`)
            })

    }
    async sendUserPointPhoto(data, chatId) {
        let date = Date.now()
        await handlePhoto.mergerUserPoint(data, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/PointUserand${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/PointUserand${date}.jpg`)
            })
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
