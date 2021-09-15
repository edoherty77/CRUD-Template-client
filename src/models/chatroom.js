const axios = require('axios')
const url = `http://localhost:4000/api/v1`

class ChatroomModel {
    static all = async () => {
        try {
            const chatrooms = await axios.get(url, {
                method: "GET"
            })
            return chatrooms
        } catch(err) {
            console.log(err)
        }
    }
}

export default ChatroomModel
