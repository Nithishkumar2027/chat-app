const moment = require('moment')

const generateMessage = (message) => {
    return {
        message,
        createdAt: moment().format('h:mm:ss a')
    }
}
const generateLocation = (coords) => {
    return {
        url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment().format('h:mm:ss a')
    }
}
module.exports = {
    generateMessage,
    generateLocation
}