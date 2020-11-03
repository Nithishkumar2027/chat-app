const socket = io()

// Connections
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


// Elements
const $messageForm = document.querySelector('#msg-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.getElementById('sendLocation')

$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    $messageFormButton.disabled = true
    const msg = event.target.elements.msg
    socket.emit('sendMessage', msg.value, () => {
        $messageFormButton.disabled = false
        $messageFormInput.value = ''
        $messageFormInput.focus()
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation services is not supported in your browser')
    }
    $sendLocationButton.disabled = true
    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', location, () => {
            $sendLocationButton.disabled = false
            console.log('Location shared')
        })
    })
})