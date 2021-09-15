const axios = require('axios')
const url = `http://localhost:4000/api/v1`

class ChatroomModel {
    static all = async () => {
        try {
            const chatrooms = await axios.get(`${url}/chatrooms`, {
                method: "GET"
            })
            return chatrooms
        } catch(err) {
            console.log(err)
        }
    }

    static create = async (data) => {
        try {
            const newChatroom = await axios.post(`${url}/chatrooms`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            })
            return newChatroom
        } catch(err) {
            console.log(err)
        }
    }
}

export default ChatroomModel
