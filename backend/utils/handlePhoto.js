
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
    async downloadPhoto(fromId) {
        const data = await axios.get(`${url1}?user_id=${fromId}`)
        if (data.data.result.photos.length == 0) {
            return 0
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
        }
    }

    async cropPhoto1(fromId) {
        let photoSource = fromId
        let checkPhoto = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (checkPhoto === false) {
            photoSource = 'profile'
        }
        let width = 1070
        let r = width / 2
        let circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}_1.jpg`)
    }
    async cropPhoto2(fromId) {
        let photoSource = fromId
        let checkPhoto = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (checkPhoto === false) {
            photoSource = 'profile'
        }
        let width = 650
        let r = width / 2
        let circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}_2.jpg`)
    }
    async cropPhoto22(fromId) {
        let photoSource = fromId
        let checkPhoto = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (checkPhoto === false) {
            photoSource = 'profile'
        }
        let width = 750
        let r = width / 2
        let circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}_2.jpg`)
    }
    async cropPhoto3(fromId) {
        let photoSource = fromId
        let checkPhoto = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (checkPhoto === false) {
            photoSource = 'profile'
        }
        let width = 810
        let r = width / 2
        let circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}_3.jpg`)
    }
    async cropPhotoPoint(fromId) {
        let photoSource = fromId
        let checkPhoto = fs.existsSync(`./public/image/${fromId}.jpg`)
        if (checkPhoto === false) {
            photoSource = 'profile'
        }
        let width = 600
        let r = width / 2
        let circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}_p.jpg`)
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

    async mergeText1(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        let userNameSend = await this.getName(fromIdSend)
        //check photo
        let checkPhotoSend = fs.existsSync(`./public/image/${fromIdSend}.jpg`)
        let checkPhotoReceive = fs.existsSync(`./public/image/${fromIdReceive}.jpg`)
        if (checkPhotoSend === false) {
            await this.downloadPhoto(fromIdSend)
            if (checkPhotoReceive === false) {
                await this.downloadPhoto(fromIdReceive)
            }
        }
        if (checkPhotoReceive === false) {
            await this.downloadPhoto(fromIdReceive)
        }
        //check Crop
        let checkCropSend = fs.existsSync(`./public/image/crop/${fromIdSend}_1.jpg`)
        let checkCropReceive = fs.existsSync(`./public/image/crop/${fromIdReceive}_1.jpg`)
        if (checkCropSend === false) {
            await this.cropPhoto1(fromIdSend)
            if (checkCropReceive === false) {
                await this.cropPhoto1(fromIdReceive)
            }
        }
        if (checkCropReceive === false) {
            await this.cropPhoto1(fromIdReceive)
        }
        //add text
        let tspan1 = `<tspan class="tspan1" >${pointChange}</tspan>`
        let tspan2 = `<tspan class="tspan2" >${userNameSend}</tspan>`
        let tspan3 = `<tspan class="tspan2" >${userNameReceive}</tspan>`
        let messageText1 = `"${pointMessage}"`
        let messageText2 = ``
        let pointMessageText = pointMessage.split(' ')
        if (pointMessageText.length >= 9) {
            messageText1 = `"${pointMessageText.slice(0, 9).join(' ')}`
            messageText2 = `${pointMessageText.slice(9, pointMessageText.length).join(' ')}"`
        }
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title2 { fill: #ffff; font-size: 160px;}
                    .title3 { fill: #ffff; font-size: 180px; font-weight: bold;}
                    .tspan1 { fill: #ffff; font-size: 225px; font-weight: bold;}
                    .tspan2 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="3500px" class="title2" dominant-baseline="middle" text-anchor="middle">${tspan3} đã nhận được ${tspan1} điểm từ ${tspan2}</text>
                <text x="50%" y="3900px" class="title3" dominant-baseline="middle" text-anchor="middle">${messageText1}</text>
                <text x="50%" y="4100px" class="title3" dominant-baseline="middle" text-anchor="middle">${messageText2}</text>
            </svg>`);

        await sharp('./public/image/body1.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_1.jpg`, left: 1195, top: 1870 },
                { input: `./public/image/crop/${fromIdReceive}_1.jpg`, left: 2730, top: 1870 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
        //delete crop photo
        try {
            let path = __dirname
            path = path.split('/utils').join('')
            fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_1.jpg`)
            fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_1.jpg`)
        } catch (error) {
            console.log(error)
        }

    }

    async mergeText2(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        let userNameSend = await this.getName(fromIdSend)
        //check photo
        let checkPhotoSend = fs.existsSync(`./public/image/${fromIdSend}.jpg`)
        let checkPhotoReceive = fs.existsSync(`./public/image/${fromIdReceive}.jpg`)
        if (checkPhotoSend === false) {
            await this.downloadPhoto(fromIdSend)
            if (checkPhotoReceive === false) {
                await this.downloadPhoto(fromIdReceive)
            }
        }
        if (checkPhotoReceive === false) {
            await this.downloadPhoto(fromIdReceive)
        }
        //check Crop
        let checkCropSend = fs.existsSync(`./public/image/crop/${fromIdSend}_2.jpg`)
        let checkCropReceive = fs.existsSync(`./public/image/crop/${fromIdReceive}_2.jpg`)
        if (checkCropSend === false) {
            await this.cropPhoto2(fromIdSend)
            if (checkCropReceive === false) {
                await this.cropPhoto22(fromIdReceive)
            }
        }
        if (checkCropReceive === false) {
            await this.cropPhoto22(fromIdReceive)
        }
        //add text
        let tspan1 = `<tspan class="tspan1" >${pointChange}</tspan>`
        let tspan2 = `<tspan class="tspan2" >${userNameSend}</tspan>`
        let tspan3 = `<tspan class="tspan2" >${userNameReceive}</tspan>`
        let messageText1 = `"${pointMessage}"`
        let messageText2 = ``
        let pointMessageText = pointMessage.split(' ')
        if (pointMessageText.length >= 9) {
            messageText1 = `"${pointMessageText.slice(0, 9).join(' ')}`
            messageText2 = `${pointMessageText.slice(9, pointMessageText.length).join(' ')}"`
        }
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title2 { fill: #ffff; font-size: 160px;}
                    .title3 { fill: #ffff; font-size: 180px; font-weight: bold;}
                    .tspan1 { fill: #ffff; font-size: 225px; font-weight: bold;}
                    .tspan2 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="4100px" class="title2" dominant-baseline="middle" text-anchor="middle">${tspan3} đã nhận được ${tspan1} điểm từ ${tspan2}</text>
                <text x="50%" y="4400px" class="title3" dominant-baseline="middle" text-anchor="middle">${messageText1}</text>
                <text x="50%" y="4600px" class="title3" dominant-baseline="middle" text-anchor="middle">${messageText2}</text>
            </svg>`);

        await sharp('./public/image/body2.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_2.jpg`, left: 1460, top: 1950 },
                { input: `./public/image/crop/${fromIdReceive}_2.jpg`, left: 2750, top: 1800 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)

        //delete crop photto
        try {
            let path = __dirname
            path = path.split('/utils').join('')
            fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_2.jpg`)
            fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_2.jpg`)
        } catch (error) {
            console.log(error)
        }

    }

    async mergeText3(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        let userNameSend = await this.getName(fromIdSend)
        //check photo
        let checkPhotoSend = fs.existsSync(`./public/image/${fromIdSend}.jpg`)
        let checkPhotoReceive = fs.existsSync(`./public/image/${fromIdReceive}.jpg`)
        if (checkPhotoSend === false) {
            await this.downloadPhoto(fromIdSend)
            if (checkPhotoReceive === false) {
                await this.downloadPhoto(fromIdReceive)
            }
        }
        if (checkPhotoReceive === false) {
            await this.downloadPhoto(fromIdReceive)
        }
        //check Crop
        let checkCropSend = fs.existsSync(`./public/image/crop/${fromIdSend}_3.jpg`)
        let checkCropReceive = fs.existsSync(`./public/image/crop/${fromIdReceive}_3.jpg`)
        if (checkCropSend === false) {
            await this.cropPhoto3(fromIdSend)
            if (checkCropReceive === false) {
                await this.cropPhoto3(fromIdReceive)
            }
        }
        if (checkCropReceive === false) {
            await this.cropPhoto3(fromIdReceive)
        }
        //add text
        let tspan1 = `<tspan class="tspan1" >${pointChange}</tspan>`
        let tspan2 = `<tspan class="tspan2" >${userNameSend}</tspan>`
        let tspan3 = `<tspan class="tspan2" >${userNameReceive}</tspan>`
        let messageText = `${pointMessage}`
        let messageText1 = ``
        let messageText2 = ``
        let messageText3 = ``
        let pointMessageText = pointMessage.split(' ')
        if (pointMessageText.length >= 5) {
            messageText1 = pointMessageText.slice(0, 5).join(' ')
            messageText2 = pointMessageText.slice(5, 10).join(' ')
            messageText3 = pointMessageText.slice(10, pointMessageText.length).join(' ')
            messageText = ''
        }
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title2 { fill: #ffff; font-size: 160px;}
                    .title3 { fill: #FFF810; font-size: 120px; font-weight: bold;}
                    .title4 { fill: #ffff; font-size: 200px; font-weight: bold;}
                    .tspan1 { fill: #ffff; font-size: 225px; font-weight: bold;}
                    .tspan2 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="4350px" class="title2" dominant-baseline="middle" text-anchor="middle">${tspan3} đã nhận được ${tspan1} điểm từ ${tspan2}</text>
                <text x="2510px" y="1290px" class="title3" text-anchor="middle">${messageText1}</text>
                <text x="2510px" y="1440px" class="title3" text-anchor="middle">${messageText2}</text>
                <text x="2510px" y="1440px" class="title3" text-anchor="middle">${messageText}</text>
                <text x="2510px" y="1590px" class="title3" text-anchor="middle">${messageText3}</text>
                <text x="750px" y="2200px" class="title4" text-anchor="middle">${userNameSend}</text>
                <text x="4220px" y="2950px" class="title4" text-anchor="middle">${userNameReceive}</text>
            </svg>`);

        await sharp('./public/image/body3.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_3.jpg`, left: 380, top: 1110 },
                { input: `./public/image/crop/${fromIdReceive}_3.jpg`, left: 3825, top: 1850 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
        //delete crop photo
        try {
            let path = __dirname
            path = path.split('/utils').join('')
            fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_3.jpg`)
            fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_3.jpg`)
        } catch (error) {
            console.log(error)
        }

    }

    async mergeText4(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        let userNameSend = await this.getName(fromIdSend)
        //check photo
        let checkPhotoSend = fs.existsSync(`./public/image/${fromIdSend}.jpg`)
        let checkPhotoReceive = fs.existsSync(`./public/image/${fromIdReceive}.jpg`)
        if (checkPhotoSend === false) {
            await this.downloadPhoto(fromIdSend)
            if (checkPhotoReceive === false) {
                await this.downloadPhoto(fromIdReceive)
            }
        }
        if (checkPhotoReceive === false) {
            await this.downloadPhoto(fromIdReceive)
        }
        //check Crop
        let checkCropSend = fs.existsSync(`./public/image/crop/${fromIdSend}_3.jpg`)
        let checkCropReceive = fs.existsSync(`./public/image/crop/${fromIdReceive}_3.jpg`)
        if (checkCropSend === false) {
            await this.cropPhoto3(fromIdSend)
            if (checkCropReceive === false) {
                await this.cropPhoto3(fromIdReceive)
            }
        }
        if (checkCropReceive === false) {
            await this.cropPhoto3(fromIdReceive)
        }
        //add text
        let tspan1 = `<tspan class="tspan1" >${pointChange}</tspan>`
        let tspan2 = `<tspan class="tspan2" >${userNameSend}</tspan>`
        let tspan3 = `<tspan class="tspan2" >${userNameReceive}</tspan>`
        let messageText = `${pointMessage}`
        let messageText1 = ``
        let messageText2 = ``
        let messageText3 = ``
        let pointMessageText = pointMessage.split(' ')
        if (pointMessageText.length >= 5) {
            messageText1 = pointMessageText.slice(0, 5).join(' ')
            messageText2 = pointMessageText.slice(5, 10).join(' ')
            messageText3 = pointMessageText.slice(10, pointMessageText.length).join(' ')
            messageText = ''
        }
        let resText = '<text x="500px" y="500px">:))</text> '
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title2 { fill: #ffff; font-size: 160px;}
                    .title3 { fill: #BC5404; font-size: 120px; font-weight: bold;}
                    .title4 { fill: #ffff; font-size: 200px; font-weight: bold;}
                    .tspan1 { fill: #ffff; font-size: 225px; font-weight: bold;}
                    .tspan2 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="4350px" class="title2" dominant-baseline="middle" text-anchor="middle">${tspan3} đã nhận được ${tspan1} điểm từ ${tspan2}</text>
                <text x="2510px" y="1290px" class="title3" text-anchor="middle">${messageText1}</text>
                <text x="2510px" y="1440px" class="title3" text-anchor="middle">${messageText2}</text>
                <text x="2510px" y="1440px" class="title3" text-anchor="middle">${messageText}</text>
                <text x="2510px" y="1590px" class="title3" text-anchor="middle">${messageText3}</text>
                <text x="750px" y="2200px" class="title4" text-anchor="middle">${userNameSend}</text>
                <text x="4220px" y="2950px" class="title4" text-anchor="middle">${userNameReceive}</text>
                ${resText}
            </svg>`);

        await sharp('./public/image/body4.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_3.jpg`, left: 380, top: 1110 },
                { input: `./public/image/crop/${fromIdReceive}_3.jpg`, left: 3825, top: 1850 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
        // delete crop photo
        try {
            let path = __dirname
            path = path.split('/utils').join('')
            fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_3.jpg`)
            fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_3.jpg`)
        } catch (error) {
            console.log(error)
        }

    }

    async mergeListPoint(listUser, date) {
        let textFull = ''
        for (let i = 0; i < listUser.length; i++) {
            let userText = `<text x="1250px" y="${1150 + (350 * i)}px" class="title" text-anchor="middle">${listUser[i].user}</text>`
            let pointText = `<text x="4000px" y="${1150 + (350 * i)}px" class="title" text-anchor="middle">${listUser[i].point}</text>`
            textFull = textFull + userText + pointText
        }
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title { fill: #ffff; font-size: 180px; font-weight: bold;}
                   
                </style>
                ${textFull}
            </svg>`);

        await sharp('./public/image/point.jpg')
            .composite([
                { input: text }
            ])
            .toFile(`./public/image/merge/PointListand${date}.jpg`)

    }

    async mergerUserPoint(data, date) {
        //check photo
        let checkPhoto = fs.existsSync(`./public/image/${data.fromId}.jpg`)
        if (checkPhoto === false) {
            await this.downloadPhoto(data.fromId)
        }
        //check Crop
        let checkCrop = fs.existsSync(`./public/image/crop/${data.fromId}_p.jpg`)
        if (checkCrop === false) {
            await this.cropPhotoPoint(data.fromId)
        }
        //xu ly text
        let textUserName = `<text x="2500px" y="750px" class="title" text-anchor="middle">${data.userName}</text>`
        let textPoint = `<text x="4000px" y="750px" class="title2" text-anchor="middle">${data.point}</text>`
        let textOut = ''
        for (let i = 0; i < data.message.length; i++) {
            let textPointChange = `<text x="4000px" y="${1900 + 560 * i}px" class="title3" text-anchor="middle">+${data.message[i].pointChange}</text>`
            let textGoc = data.message[i].message.replace(/(<([^>]+)>)/gi, "")
            textGoc = textGoc.replace(/</g, "")
            let textMessage = `<text x="1550px" y="${1900 + 560 * i}px" class="title3" text-anchor="middle">${textGoc}</text>`
            let check = textGoc.split(' ')
            if (check.length > 8) {
                let messageText1 = `<text x="1550px" y="${1900 + 560 * i}px" class="title3" text-anchor="middle">${check.slice(0, 8).join(' ')}</text>`
                let messageText2 = `<text x="1550px" y="${1900 + 560 * i + 200}px" class="title3" text-anchor="middle">${check.slice(8, check.length).join(' ')}</text>`
                textMessage = messageText1 + messageText2
            }
            textOut = textOut + textPointChange + textMessage
        }
        //merge
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    @font-face {
                        font-family: font;
                        src: url(public/font/font.tff);
                    }
                    svg{
                        font-family: font, fallBackFonts, sans-serif;
                    }
                    .title { fill: #ffff; font-size: 180px; font-weight: bold;}
                    .title2 { fill: #ffff; font-size: 220px; font-weight: bold;}
                    .title3 { fill: #ffff; font-size: 160px; font-weight: bold;}

                </style>
                ${textUserName}
                ${textPoint}
                ${textOut}
            </svg>`);
        await sharp('./public/image/pointOne.jpg')
            .composite([
                { input: `./public/image/crop/${data.fromId}_p.jpg`, left: 800, top: 460 },
                { input: text }
            ])
            .toFile(`./public/image/merge/PointUserand${date}.jpg`)
        // delete crop photo
        try {
            let path = __dirname
            path = path.split('/utils').join('')
            fs.unlinkSync(`${path}/public/image/crop/${data.fromId}_p.jpg`)
        } catch (error) {
            console.log(error)
        }
    }

    async randomPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        console.time('merge Ảnh : ')
        let func = [0, 1, 2, 3, 4]
        let random = Math.floor(Math.random() * func.length)
        if (func[random] === 0) {
            await this.mergeText1(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 1) {
            await this.mergeText1(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 2) {
            await this.mergeText2(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 3) {
            await this.mergeText3(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 4) {
            await this.mergeText4(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        }
        console.timeEnd('merge Ảnh : ')
    }



}
module.exports = new Photo()