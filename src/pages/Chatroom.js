import React from 'react'

function Chatroom(props) {
  const currentChatroom = props.location.state
  return (
    <div>
      {currentChatroom.name}
    </div>
  )
}

export default Chatroom
