const moment = require('moment')

const generateMessage = (username, message) => {
    return {
        username,
        message,
        createdAt: moment().format('h:mm:ss a')
    }
}
const generateLocation = (username, coords) => {
    return {
        username,
        url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment().format('h:mm:ss a')
    }
}
module.exports = {
    generateMessage,
    generateLocation
}