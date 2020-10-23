import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/authReducer';

const Login = (props) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/api/auth/login', { username, password }).then(res => {
      props.loginUser(res.data);
      props.history.push('/Landing')
    })
      .catch(err => alert(err.message))
  }

  return (
    <div className='login-container'>
      <input type='text' placeholder='Username' onChange={e => setUserName(e.target.value)}></input>
      <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
      <button onClick={() => login()}>Login</button>
      <p>Don't have an account?</p>
      <button onClick={() => props.history.push('/Register')}>Register</button>
    </div>
  )
}

export default connect(null, { loginUser })(Login);