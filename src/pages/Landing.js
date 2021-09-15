import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AuthModel from '../models/auth'

function Landing() {
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
    try {
      const foundUser = await AuthModel.login(userInfo)
      console.log('foundUser', foundUser)

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <div>username:</div>
        <input type="text" onChange={text => handleChange(text, 'username')} value={username}/>
      </div>
      <div>
        <div>password:</div>
        <input type="text" onChange={text => handleChange(text, 'password')} value={password}/>
      </div>
      <div>
        <button onClick={signIn}>Sign In</button>
      </div>
      <div>Not a member? <Link to='/signup'>Sign Up</Link></div>
    </div>
  )
}

export default Landing