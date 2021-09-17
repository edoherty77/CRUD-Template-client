import React, {useState, useEffect} from 'react'
import MessageModel from '../models/message'
import ChatroomModel from '../models/chatroom'

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

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const { status, data, error, isFetching } = useQuery(['messages'], async () => {
    const chatroom = await ChatroomModel.show(roomId)
    setCurrentChatroom(chatroom.data)
    return chatroom.data.messages.map((msg, index) => {
      return (
        <li key={index} class='message'>
          <div class='message-text'>{msg.message}</div>
          <div class='message-username'>-{msg.username}</div>
          {currentUser === msg.username && (
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
        </li>
      )
    })
  },
  // {refetchInterval: 1000}
  )

  const addMutation = useMutation(message => MessageModel.create({message: message, username: currentUser, chatroomId: roomId}), {
    onSuccess: () => queryClient.invalidateQueries('messages'),
  })

  if (status === 'loading') return <h1>Loading...</h1>
  
  return (
    <div class='chatroom'>
      <button class='back-btn' onClick={() => props.history.push('/home')}>Back</button>
      <h1 class='chatroom-name'>{currentChatroom.name}</h1>
      <ul class='message-list'>
        {data}
      </ul>
      <form onSubmit={event => {
          event.preventDefault()
          addMutation.mutate(message, {
              onSuccess: () => {
                  setMessage('')
              }
          })
        }}> 
        <input type="text" value={message} onChange={text => handleChange(text)}/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chatroom
