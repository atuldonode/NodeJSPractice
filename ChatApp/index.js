const express = require('express')
const app = express()
    // const http = require('http').createServer(app);


const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Listening On Port: ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket
const io = require('socket.io')(server); 

io.on('connection', socket => {
    console.log('Connected...')
    socket.on('message', msg => {
        socket.broadcast.emit('message', msg)
    })
})