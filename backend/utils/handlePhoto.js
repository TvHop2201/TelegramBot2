
const axios = require('axios')
const { once } = require('events')
const fs = require('fs')
const sharp = require('sharp')
const userModel = require('../model/user')
const url1 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`
const url2 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=`
const url3 = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}`
const url4 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

class Photo {
    async getProfilePhotoId(fromId) {
        let check = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (check === false) {
            await this.downloadPhoto(fromId)
        } else {
            await this.cropPhoto(fromId, fromId)
        }

    }

    async downloadPhoto(fromId) {
        const data = await axios.get(`${url1}?user_id=${fromId}`)
        if (data.data.result.photos.length == 0) {
            this.cropPhoto('profile', fromId)
        } else {
            let fileId
            for (const index of data.data.result.photos[0]) {
                fileId = index.file_id
            }
            const data1 = await axios({
                method: 'get',
                url: `${url2}${fileId}`
            })
            const filePath = data1.data.result.file_path
            const data3 = await axios({
                method: 'get',
                url: `${url3}/${filePath}`,
                responseType: 'stream'
            })
            let stream = data3.data.pipe(fs.createWriteStream(`public/image/${fromId}.jpg`))
            await once(stream, 'finish');
            await this.cropPhoto(fromId, fromId)
        }
    }

    async cropPhoto(photoSource, fromId) {
        const width = 1070,
            r = width / 2,
            circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}.jpg`)
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

    async mergeText(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date, userNameSend) {
        let ok = `${userNameReceive} đã nhận được ${pointChange}`
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    .title3 { fill: #ffff; font-size: 180px; font-weight: bold;}
                </style>

                <text x="450px" y="3500px" class="title3">${ok}  điểm từ ${userNameSend}</text>
                <text x="450px" y="4000px" class="title3">Message : ${pointMessage}</text>
            </svg>`);

        await sharp('./public/image/body1.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}.jpg`, left: 1195, top: 1870 },
                { input: `./public/image/crop/${fromIdReceive}.jpg`, left: 2730, top: 1870 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)

    }

    async compoundPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        try {
            console.log(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
            let userNameSend = await this.getName(fromIdSend)
            let checkSend = fs.existsSync(`./public/image/crop/${fromIdSend}.jpg`)
            let checkReceive = fs.existsSync(`./public/image/crop/${fromIdReceive}.jpg`)
            console.log(userNameSend, checkSend, checkReceive)

            if (checkSend === false) {
                await this.getProfilePhotoId(fromIdSend)
                if (!checkReceive) {
                    await this.getProfilePhotoId(fromIdReceive)
                    await this.mergeText(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date, userNameSend)
                    return 0
                }
                await this.mergeText(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date, userNameSend)
                return 0
            }
            if (!checkReceive === false) {
                await this.getProfilePhotoId(fromIdReceive)
                await this.mergeText(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date, userNameSend)
                return 0
            }
            if (checkReceive === true && checkSend === true) {
                console.log('run')
                await this.mergeText(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date, userNameSend)
                return 0
            }
        } catch (err) {
            console.log("err ", err.message)
        }
    }



}
module.exports = new Photo()