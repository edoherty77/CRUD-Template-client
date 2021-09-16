import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'

import ChatroomModel from '../models/chatroom'

function Home() {
    const queryClient = useQueryClient()

    const [newChatroom, setNewChatroom] = useState('')

    const handleChange = (e) => {
        setNewChatroom(e.target.value)
    }

    const query = useQuery(['chatrooms'], async () => {
        const chatrooms = await ChatroomModel.all()
        return chatrooms.data.map((chatroom, index) => {
          return (
                <li key={index}>
                    <Link to={{pathname: `/chatroom/${chatroom.name}}`, state: chatroom}} key={index}>{chatroom.name}</Link>
                </li>
          )
        })
    })

    const addMutation = useMutation(newChatroom => ChatroomModel.create({name: newChatroom}), {
        onSuccess: () => queryClient.invalidateQueries('chatrooms'),
      })

    return (
        <div>
            <h1>Chatrooms</h1>
            {query.data}
            <div>
                <h4>Create chatroom</h4>
                <form onSubmit={event => {
                    event.preventDefault()
                    addMutation.mutate(newChatroom, {
                        onSuccess: () => {
                            setNewChatroom('')
                        }
                    })
                }}> 
                    <input type="text" value={newChatroom} onChange={(text) => handleChange(text)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Home

