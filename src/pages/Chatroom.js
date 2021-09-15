import React, {useState, UseEffect} from 'react'

function Chatroom(props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const currentChatroom = props.location.state
  const currentUser = localStorage.getItem('username')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async () => {
    console.log(currentUser, message)
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
