import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/authReducer';
import './Login.scss'
import { FaKey } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";



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
      

      <div><img className ="logo" src ="https://i.imgur.com/WGq3YbT.png"/></div>
      <div className="input-container">
      
        
        <label>
          <div className="username-container">
            <FaUserAlt className="username-icon"/>
            <input type='text' placeholder='Username' onChange={e => setUserName(e.target.value)}></input>
          </div>
        </label>
        <label>
          <div className="password-container">
            <FaKey className="password-icon"/>
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
          </div>
        </label>
      </div>
      <div className="login-button-container">
        <FaPlayCircle className="login-icon" />
        <button onClick={() => login()}>Login</button>
      </div>

      <p className="account-p">Don't have an account?</p>
      <div className="register-button-container">
        <FaPencilAlt className="register-icon"/>
       <div className="button-div"><button onClick={() => props.history.push('/Register')}>Register</button></div> 
      </div>

    </div>
  )
}

export default connect(null, { loginUser })(Login);