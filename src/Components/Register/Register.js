import React, { useState } from 'react'
import axios from 'axios'
import './Register.scss'
import {Link} from 'react-router-dom'
import { FaKey } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";


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
    <div className="register-container">
       <div><img className ="logo" src ="https://i.imgur.com/WGq3YbT.png"/></div>
      <h1>Register</h1>
      
      <div className="input-container">
        <div>
          < FaUserAlt className="icon"/>
          <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        
        <div>
          <FaKey className="icon"/>
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
       
        <div>
          <FaMailBulk className="icon"/>
          <input type='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        
        
        <div>
          <FaGlobe className="icon"/>
          <input type='number' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}></input>
        </div>
        
        <div className="button-container">
          <FaPencilAlt className="register-icon"/>
          <button onClick={() => submitRegistration()}>Register</button>
        </div>
        <div className="button-container">
          <FaPlayCircle className="back-icon"/>
          <Link to="/"><button>Back</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Register