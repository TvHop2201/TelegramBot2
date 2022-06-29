
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
        let ok = `${userNameReceive} đã nhận được ${pointChange}`
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    .title2 { fill: #ffff; font-size: 200px; font-weight: bold;}
                    .title3 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="3500px" class="title3" dominant-baseline="middle" text-anchor="middle">${ok}  điểm từ ${userNameSend}</text>
                <text x="600px" y="4000px" class="title3">"${pointMessage}"</text>
            </svg>`);

        await sharp('./public/image/body1.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_1.jpg`, left: 1195, top: 1870 },
                { input: `./public/image/crop/${fromIdReceive}_1.jpg`, left: 2730, top: 1870 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
        //delete crop photo
        let path = __dirname
        path = path.split('/utils').join('')
        fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_1.jpg`)
        fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_1.jpg`)
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
        let ok = `${userNameReceive} đã nhận được ${pointChange}`
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    .title2 { fill: #ffff; font-size: 200px; font-weight: bold;}
                    .title3 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="4100px" class="title3" dominant-baseline="middle" text-anchor="middle">${ok}  điểm từ ${userNameSend}</text>
                <text x="600px" y="4400px" class="title3">"${pointMessage}"</text>
            </svg>`);

        await sharp('./public/image/body2.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_2.jpg`, left: 1460, top: 1950 },
                { input: `./public/image/crop/${fromIdReceive}_2.jpg`, left: 2750, top: 1800 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)

        //delete crop photto
        let path = __dirname
        path = path.split('/utils').join('')
        fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_2.jpg`)
        fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_2.jpg`)
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
        let ok = `${userNameReceive} đã nhận được ${pointChange}`
        let text = Buffer.from(
            `<svg width="5000" height="5000">
                <style>
                    .title2 { fill: #ffff; font-size: 200px; font-weight: bold;}
                    .title3 { fill: #ffff; font-size: 190px; font-weight: bold;}
                </style>
                <text x="50%" y="4200px" class="title3" dominant-baseline="middle" text-anchor="middle">${ok}  điểm từ ${userNameSend}</text>
                <text x="1710px" y="1300px" class="title3">"${pointMessage}"</text>
                <text x="520px" y="2200px" class="title3">${userNameSend}</text>
                <text x="3900px" y="2950px" class="title3">${userNameReceive}</text>
            </svg>`);

        await sharp('./public/image/body3.png')
            .composite([
                { input: `./public/image/crop/${fromIdSend}_3.jpg`, left: 380, top: 1110 },
                { input: `./public/image/crop/${fromIdReceive}_3.jpg`, left: 3825, top: 1850 },
                { input: text }
            ])
            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
        // delete crop photo
        let path = __dirname
        path = path.split('/utils').join('')
        fs.unlinkSync(`${path}/public/image/crop/${fromIdSend}_3.jpg`)
        fs.unlinkSync(`${path}/public/image/crop/${fromIdReceive}_3.jpg`)
    }


    async randomPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        let func = [0, 1, 2, 3]
        let random = Math.floor(Math.random() * func.length)
        console.log(random, func[random])
        if (func[random] === 0) {
            await this.mergeText1(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 1) {
            await this.mergeText1(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 2) {
            await this.mergeText2(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        } else if (func[random] === 3) {
            await this.mergeText3(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
        }
    }



}
module.exports = new Photo()