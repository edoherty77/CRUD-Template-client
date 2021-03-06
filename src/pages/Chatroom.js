import React, {useState, useEffect} from 'react'
import MessageModel from '../models/message'
import ChatroomModel from '../models/chatroom'
import Message from '../components/Message'

import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

function Chatroom(props) {
  const queryClient = useQueryClient()
  const roomId = props.match.params.id
  const [message, setMessage] = useState('')
  const [currentChatroom, setCurrentChatroom] = useState('')
  const currentUser = localStorage.getItem('username')

  const { status, data, error, isFetching } = useQuery(['messages'], async () => {
    const chatroom = await ChatroomModel.show(roomId)
    setCurrentChatroom(chatroom.data)
    return chatroom.data
  },
  // {refetchInterval: 1000}
  )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  
  
  const createMessage = useMutation(message => MessageModel.create({message: message, username: currentUser, chatroomId: roomId}), {
    onSuccess: () => queryClient.invalidateQueries('messages'),
  })
  
  return (
    <div>
      <button className='back-btn' onClick={() => props.history.push('/home')}>Back</button>
      <h1 className='chatroom-name'>{currentChatroom.name}</h1>
      <div className='chatroom'>
        <div className='message-form'>
          <form onSubmit={event => {
              event.preventDefault()
              createMessage.mutate(message, {
                  onSuccess: () => {
                      setMessage('')
                  }
              })
            }}> 
            <input type="text" value={message} onChange={text => handleChange(text)}/>
            <button type="submit">Send</button>
          </form>
        </div>
        <div className='messages'>
          <ul className='message-list'>
            {data && data.messages.slice(0).reverse().map((msg, index) => (
              <Message msg={msg} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Chatroom
