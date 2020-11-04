const moment = require('moment')

const generateMessage = (message) => {
    return {
        message,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
}
module.exports = {
    generateMessage
}