const axios = require('axios')
const url = `http://localhost:4000/api/v1`

export default class AuthModel {
  static register = async (userData) => {
    console.log(userData)
    try {
      const newUser = await axios.post(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }

  static async login(credentials) {
    console.log(credentials)
    const res = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    return await res.json()
  }

  static async logout() {
    const res = await fetch(`${url}/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return await res.json()
  }
}
