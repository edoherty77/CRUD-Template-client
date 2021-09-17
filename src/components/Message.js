import React, {useState, useEffect} from 'react'
import MessageModel from '../models/message'

import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

function Message({msg}) {
  // console.log('msg', msg)
  const queryClient = useQueryClient()
  const currentUser = localStorage.getItem('username')
  const [toggleInput, setToggleInput] = useState(false)
  const [messageEdit, setMessageEdit] = useState('')

  const toggleEdit = () => {
    setToggleInput(!toggleInput)
  }

  const {mutate} = useMutation(messageEdit => MessageModel.update({messageId: msg._id, newMessage: messageEdit}), {
    onMutate: (updatedMessage) => {
      console.log('ipdatedMsg', updatedMessage)
      setToggleInput(false)
      setMessageEdit('')
      queryClient.setQueryData(['message', msg._id], updatedMessage)
    },
    onSuccess: data => {
      queryClient.invalidateQueries(['message', msg._id], data)


    }
  })
  
  const handleDelete = async () => {
    await MessageModel.delete(msg)
  }

  const { data: message } = useQuery(['message', msg._id], async () => {
    const foundMessage = await MessageModel.show(msg._id)
    console.log('found', foundMessage.data)
    return foundMessage.data
  })

  return (
    <li className='message'>
      <div className='message-text'>{message && message.message}</div>
      <div className='message-username'>-{message && message.username}</div>
      {currentUser === msg.username && (
          <div>
            {toggleInput === true && (
              <form onSubmit={(e) => {
                e.preventDefault()
                mutate(messageEdit)
              }}>
                <input type="text" value={messageEdit} onChange={(text) => setMessageEdit(text.target.value)}/>
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
