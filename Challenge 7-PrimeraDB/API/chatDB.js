const { optionslite } = require(`../options/sqlite3.js`);

let chatArray = [];

const startChat = async () => {
    try {
        await optionslite.schema.dropTableIfExists(`chat`);

        await optionslite.schema.createTable(`chat`, entry => {
            entry.increments(`id`).primary()
            entry.string(`username`, 50).notNullable()
            entry.string(`message`, 100).notNullable()
        })
    } catch (error) {
        console.log(error)
    }
}

const postMessage = async (username, message) => {
    try {
        await optionslite(`chat`).insert({username: username, message: message})
    } catch (error) {
        console.log(error)
    }
}

const readChat = async () => {
    try {
        const messages = await optionslite.from(`chat`).select(`username`, `message`);
        messages.forEach(entry => {
            chatArray.push({username: entry.username, message: entry.message})
        })
        console.log(chatArray);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {startChat, postMessage, readChat, chatArray};