const socket = io()
socket.on('greetings', (data) => {
    console.log(data)
})
socket.on('userMessage', (msg) => {
    console.log(msg)
})

document.querySelector('#msg-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = event.target.elements.msg
    // console.log(msg.value)
    socket.emit('sendMessage', msg.value)
    msg.value = ''
})