const socket = io()

socket.on('greetings', (data) => {
    console.log(data)
})
socket.on('userMessage', (msg) => {
    console.log(msg)
})
socket.on('broadcastMessage', (msg) => {
    console.log(msg)
})
socket.on('sendLocation', (coords) => {
    console.log(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
})
document.querySelector('#msg-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = event.target.elements.msg
    // console.log(msg.value)
    socket.emit('sendMessage', msg.value)
    msg.value = ''
})

document.querySelector('#sendLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation services is not supported in your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', location)
    })
})