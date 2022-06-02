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
    io.on('connection', async (socket) => {
        socket.on('chatId', async (data) => {
            console.log('User connect : ', socket.id)
            setInterval(async () => {
                const chatData = await chatModel.find({
                    chatId: data,
                    date: {
                        $gte: Date.now() - 3000,
                        $lte: Date.now()
                    }
                }).sort({ date: -1 })
                var result = []
                for (let i = 0; i < chatData.length; i++) {
                    const chatUser = await userModel.findOne({ fromId: chatData[i].fromId })
                    result.push({ chat: chatData[i], user: chatUser })
                }
                socket.emit('data', result)
            }, 3000);

        })

        socket.on('disconnect', () => {
            console.log(`User disconnect : ${socket.id}`)
        })
    })
}



module.exports = websocket


