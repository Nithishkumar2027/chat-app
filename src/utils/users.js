const users = []

// Adding user
const addUser = ({ id, username, room }) => {

    username = capitalizeFirstLetter(username)
    room = capitalizeFirstLetter(room)
    console.log(username, room)
    // Data validation
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // Checking for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Username validation
    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    // Storing users
    const user = { id, username, room }
    users.push(user)
    return { user }
}

// Removing user
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get user info
const getUser = (id) => {
    return users.find(user => user.id === id)
}

// Get users list by room name
const getUsersInRoom = (room) => {
    room = capitalizeFirstLetter(room)
    return users.filter(user => user.room === room)
}

const capitalizeFirstLetter = (string) => {
    string = string.trim()
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}