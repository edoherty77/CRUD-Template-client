import React, {useState} from 'react'
import MessageModel from '../models/message'

import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

function Message({roomId, msg}) {
  console.log('msg', msg)
  const queryClient = useQueryClient()
  const currentUser = localStorage.getItem('username')
  const [toggleInput, setToggleInput] = useState(false)
  const [messageEdit, setMessageEdit] = useState('')

  const toggleEdit = () => {
    setToggleInput(!toggleInput)
  }

  const handleEdit = useMutation(messageEdit => MessageModel.update({messageId: msg._id, newMessage: messageEdit}), {
    onMutate: (updatedMessage) => {
      queryClient.setQueryData(['message', msg._id], updatedMessage)
    },
    onSuccess: data => {
      queryClient.invalidateQueries(['message', { id: msg._id }], data)
    }
  })

  const { status, data, error } = useQuery(['message', {id: msg._id}], async () => {
    await MessageModel.show(msg._id)
  })
  
  const handleDelete = async () => {
    await MessageModel.delete(msg)
  }

  return (
    <li className='message'>
      <div className='message-text'>{msg.message}</div>
      <div className='message-username'>-{msg.username}</div>
      {currentUser === msg.username && (
          <div>
            {toggleInput === true && (
              <form onSubmit={(e) => {
                e.preventDefault()
                handleEdit.mutate(messageEdit, {
                  onSuccess: () => {
                    setMessageEdit('')
                    setToggleInput(false)
                  }
                })
              }}>
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
