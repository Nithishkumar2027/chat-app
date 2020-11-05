const users = []

// Adding user
const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

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
