import React, {useState} from 'react'
import { Link } from 'react-router-dom'

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

    const { status, data, error, isFetching } = useQuery(['chatrooms'], async () => {
        const chatrooms = await ChatroomModel.all()
        return chatrooms.data.map((chatroom, index) => {
          return (
                <li key={index}>
                    <Link to={`/chatroom/${chatroom._id}`} key={index}>{chatroom.name}</Link>
                </li>
          )
        })
    },
    {
        refetchInterval: 1000
    }
    )

    const addMutation = useMutation(newChatroom => ChatroomModel.create({name: newChatroom}), {
        onSuccess: () => queryClient.invalidateQueries('chatrooms'),
    })


    if (status === 'loading') return <h1>Loading...</h1>

    return (
        <div>
            <h1>Chatrooms</h1>
            {data}
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

