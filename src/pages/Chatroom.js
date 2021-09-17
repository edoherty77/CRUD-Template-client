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
  const [messages, setMessages] = useState([])
  const [room, setRoom] = useState('')
  const currentUser = localStorage.getItem('username')

  const fetchChatroomData = async () => {
    const chatroomData = await ChatroomModel.show(roomId)
    console.log(chatroomData)
    const chatroomMessages = chatroomData.data.messages
    console.log(chatroomMessages)
    const name = chatroomData.data.name
    setRoom(name)
    setMessages(chatroomMessages)
    console.log(messages)
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async () => {
    let arr = messages
    const obj = {
      chatroomId: roomId,
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
  }, [])

  const messagesList = messages.map((msg, index) => {
    return (
      <li key={index}>
        {msg.username} - {msg.message}
      </li>
    )
  })

  const { status, data, error, isFetching } = useQuery(['messages'], async () => {
    const chatroom = await ChatroomModel.show(roomId)
    return chatroom.data.messages.map((msg, index) => {
      return (
            <li key={index}>
                {msg.username} - {msg.message}
            </li>
      )
    })
  },
  {
      refetchInterval: 1000
  }
  )

  const addMutation = useMutation(newMessage => MessageModel.create({message: message, username: currentUser, chatroomId: roomId}), {
    onSuccess: () => queryClient.invalidateQueries('messages'),
  })


  return (
    <div>
      <h1>{room}</h1>
      <ul>
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
