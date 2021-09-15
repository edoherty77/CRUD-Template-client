import React, {useState, UseEffect} from 'react'
import MessageModel from '../models/message'

function Chatroom(props) {
  const currentChatroom = props.location.state
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(currentChatroom.messages)
  const currentUser = localStorage.getItem('username')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async () => {
    let arr = messages
    const obj = {
      chatroomId: currentChatroom._id,
      username: currentUser,
      message: message
    }
    const newMessage = await MessageModel.create(obj)
    arr.push(newMessage.data)
    setMessages([...arr])
    console.log(messages)
    setMessage('')
  }

  return (
    <div>
      <h1>{currentChatroom.name}</h1>
      <div>
        <input type="text" value={message} onChange={text => handleChange(text)}/>
        <button type="submit" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chatroom
