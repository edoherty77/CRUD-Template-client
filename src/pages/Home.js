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
        let arr = chatrooms
        const obj = {name: newChatroom}
        let createdChatroom = await ChatroomModel.create(obj)
        arr.push(createdChatroom.data)
        setChatrooms([...arr])
        setNewChatroom('')
    }

    const fetchChatrooms = async () => {
        const foundChatrooms = await ChatroomModel.all()
        setChatrooms(foundChatrooms.data)
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
                <div>
                    <input type="text" value={newChatroom} onChange={(text) => handleChange(text)} />
                    <button onClick={createChatroom} type='submit'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Home

