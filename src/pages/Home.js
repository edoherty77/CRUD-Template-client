import React, {useState, useEffect} from 'react'
import ChatroomModel from '../models/chatroom'
import { Link, useHistory } from 'react-router-dom'

function Home() {
    const [newChatroom, setNewChatroom] = useState('')
    const [chatrooms, setChatrooms] = useState([])

    const handleChange = (e) => {
        setNewChatroom(e.target.value)
    }

    const createChatroom = async () => {
        const obj = {name: newChatroom}
        await ChatroomModel.create(obj)
    }

    const fetchChatrooms = async () => {
        const foundChatrooms = await ChatroomModel.all()
        setChatrooms(foundChatrooms.data)
    }

    const enterChatroom = (chatroom) => {
        console.log(chatroom)
    }

    useEffect(() => {
        fetchChatrooms()
    }, [])

    const chatRoomList = chatrooms.map((chatroom, index) => {
        return (
            <li key={index}>
                <Link to={{pathname: `/chatroom/${chatroom.name}}`, state: chatroom}} key={index}>{chatroom.name}</Link>
            </li>
        )
    })

    return (
        <div>
            <h1>Chatrooms</h1>
            {chatRoomList}
            <div>
                <h4>Create chatroom</h4>
                <input type="text" value={newChatroom} onChange={(text) => handleChange(text)} />
                <button onClick={createChatroom}>Submit</button>
            </div>
        </div>
    )
}

export default Home

