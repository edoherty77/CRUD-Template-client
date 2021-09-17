import React, {useState} from 'react'
import MessageModel from '../models/message'

function Message({roomId, msg}) {
  const [toggleInput, setToggleInput] = useState(false)
  const [messageEdit, setMessageEdit] = useState('')

  const toggleEdit = () => {
    setToggleInput(!toggleInput)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    const obj = {
      messageId: msg._id,
      newMessage: messageEdit
    }
    console.log(obj)
    MessageModel.update(obj)
    setMessageEdit('')
    setToggleInput(false)
  }
  
  const handleDelete = (messageData) => {
    const obj = {
      roomId: roomId,
      messageData: messageData
    }
    MessageModel.delete(obj)
  }

  const currentUser = localStorage.getItem('username')
  return (
    <li className='message'>
      <div className='message-text'>{msg.message}</div>
      <div className='message-username'>-{msg.username}</div>
      {currentUser === msg.username && (
          <div>
            {toggleInput === true && (
              <form onSubmit={(e) => handleEdit(e)}>
                <input type="text" onChange={(text) => setMessageEdit(text.target.value)}/>
                <button type='submit'>Submit</button>
              </form>
            )}
            <div className='msg-btns'>
              <button onClick={toggleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
    </li>
  )
}

export default Message
