const socket = io()

// Elements
const $messageForm = document.querySelector('#msg-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.getElementById('sendLocation')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// Connections
socket.on('greetings', (data) => {
    console.log(data.message)
})
socket.on('userMessage', (usermsg) => {
    console.log("Message: ", usermsg.message)
    console.log("Time: ", usermsg.createdAt)
    const html = Mustache.render(messageTemplate, {
        usermsg
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
socket.on('broadcastMessage', (msg) => {
    console.log(msg.message)
})
socket.on('locationMessage', (coords) => {
    console.log(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    const html = Mustache.render(locationTemplate, {
        url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    })
    $messages.insertAdjacentHTML('beforeend', html)
})



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