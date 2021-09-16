import React, {useState, useEffect} from 'react'
import MessageModel from '../models/message'
import ChatroomModel from '../models/chatroom'

function Chatroom(props) {
  const currentChatroom = props.location.state
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const currentUser = localStorage.getItem('username')

  const fetchChatroomData = async () => {
    const chatroomData = await ChatroomModel.show(currentChatroom._id)
    const chatroomMessages = chatroomData.data.messages
    console.log(chatroomMessages)
    setMessages(chatroomMessages)
    console.log(messages)
  }

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
    setMessage('')
    console.log(messages)
  }

  useEffect(() => {
    fetchChatroomData()
    console.log(currentChatroom)
  }, [])

  const messagesList = messages.map((msg, index) => {
    return (
      <li key={index}>
        {msg.username} - {msg.message}
      </li>
    )
  })

  return (
    <div>
      <h1>{currentChatroom.name}</h1>
      <ul>
        {messagesList}
      </ul>
      <div>
        <input type="text" value={message} onChange={text => handleChange(text)}/>
        <button type="submit" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chatroom
