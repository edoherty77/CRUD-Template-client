import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AuthModel from '../models/auth'

function SignUp() {
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
    const foundUser = await AuthModel.register(userInfo)
    console.log('foundUser', foundUser)
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
