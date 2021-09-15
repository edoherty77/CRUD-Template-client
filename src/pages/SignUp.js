import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import AuthModel from '../models/auth'

function SignUp() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleChange = (e, field) => {
    if(field === 'username'){
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const signIn = async () => {
    const userInfo = {username, password}
    const newUser = await AuthModel.register(userInfo)
    if(newUser) {
      localStorage.setItem("username", newUser.data.username)
      history.push('/home')
    }
  }
  return (
    <div>
      <div>
        <div>username:</div>
        <input type="text" onChange={text => handleChange(text, 'username')} value={username}/>
      </div>
      <div>
        <div>password:</div>
        <input type="text" onChange={text => handleChange(text, 'password')} value={password}/>
      </div>
      <div>
        <button onClick={signIn}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp
