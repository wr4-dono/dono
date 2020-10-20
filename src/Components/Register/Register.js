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
  }


  return (
    <div>
      <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
      <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
      <input type='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
      <input type='number' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}></input>
      <button onClick={() => submitRegistration()}>Register</button>
    </div>
  )
}

export default Register