const socket = io()

let username
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let username_span = document.querySelector('#username_span')

do {
    username = prompt('Please Enter Your Name: ')
} while (!username)
username = username.trim()

username_span.innerHTML = username

// TODO: change enter to btn
textarea.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

const sendMessage = message => {
    let msg = {
        user: username,
        message: message.trim()
    }

    textarea.value = ''

    //Append 
    appendMessage(msg, 'outgoing')
    scrollToBottom()

    //send to server
    socket.emit('message', msg)
}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Receive Message
socket.on('message', msg => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

const scrollToBottom = () => messageArea.scrollTop = messageArea.scrollHeight