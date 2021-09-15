import React, {useEffect} from 'react'
import ChatroomModel from './models/chatroom'

function App() {

  const fetchData = async () => {
    const chatrooms = await ChatroomModel.all()
    console.log(chatrooms)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      Hi
    </div>
  )
}

export default App
