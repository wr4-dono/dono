import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [zip_code, setZipCode] = useState(null)

  const submitRegistration = () => {
    axios.post('/api/auth/register', { username, password, zip_code, email })
      .then(res => {
        props.history.push('/');
      }).catch(err => alert(err.message));

    registerEmail()
  }

  function registerEmail() {
    axios.post('/api/auth/register/registeremail', { username, email })

  }

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Username:
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <label>Password:
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <label> E-mail:
        <input type='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
        </label>
        <label> Your Zip code:
        <input type='number' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}></input>
        </label>
        <button onClick={() => submitRegistration()}>Register</button>
      </div>
    </div>
  )
}

export default Register