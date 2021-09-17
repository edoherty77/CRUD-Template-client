const axios = require('axios')
const url = `http://localhost:4000/api/v1`

class MessageModel {
    static all = async () => {
        
    }

    static create = async (messageData) => {
        try {
            const newMessage = await axios.post(`${url}/messages`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            })
            return newMessage
        } catch(err) {
            console.log(err)
        }
    }

    static update = async (data) => {
        try {
            const updatedMessage = await axios.put(`${url}/messages/${data.messageId}`, data)
            return updatedMessage
          } catch (error) {
            console.log(error)
          }
    }

    static delete = async (data) => {
        try {
            await axios.delete(`${url}/messages/${data.roomId}`)
          } catch (error) {
            console.log(error)
          }
    }
}

export default MessageModel