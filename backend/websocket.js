const { Server } = require("socket.io")
const chatModel = require('./model/chat')
const userModel = require('./model/user')
const io = new Server(4000, {
    cors: {
        origin: "http://localhost:3000"
    }
})
console.log("websocket Start")
function websocket() {
    const autoEmit = (socket, data, lastTime = Date.now()) => {
        let timeNow = Date.now();
        setTimeout(async () => {
            const chatData = await chatModel.find({
                chatId: data,
                date: {
                    $gte: lastTime ? lastTime : 5000,
                    $lte: Date.now()
                }
            }).sort({ date: -1 })
            var result = []
            for (let i = 0; i < chatData.length; i++) {
                const chatUser = await userModel.findOne({ fromId: chatData[i].fromId })
                result.push({ chat: chatData[i], user: chatUser })
            }
            socket.emit('data', result)
            autoEmit(socket, data, timeNow);
        }, 5000);

    }

    io.on('connection', async (socket) => {
        socket.on('chatId', async (data) => {
            console.log('User connect : ', socket.id)
            autoEmit(socket, data)

        })

        socket.on('disconnect', () => {
            console.log(`User disconnect : ${socket.id}`)
        })
    })
}



module.exports = websocket


