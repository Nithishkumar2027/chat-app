const moment = require('moment')

const generateMessage = (message) => {
    return {
        message,
        createdAt: moment().format('h:mm:ss a')
    }
}
module.exports = {
    generateMessage
}