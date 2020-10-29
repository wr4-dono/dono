import React, { useState } from 'react'
import axios from 'axios'
import './Register.scss'
import { Link } from 'react-router-dom'
import { FaKey } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";







const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [userState, setUserState] = useState('')
  const [zipCode, setZipCode] = useState('')


  const submitRegistration = () => {
    //This will need 
    const zip_code = zipCode.toString()
    console.log(typeof zip_code)
    axios.post('/api/auth/register', { username, password, userState, zip_code, email })
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
      <div><img className="logo" src="https://i.imgur.com/WGq3YbT.png" /></div>
      

      <div className="input-container">
        <div>
          < FaUserAlt className="icon" />
          <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
        </div>

        <div>
          <FaKey className="icon" />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <div>
          <FaMailBulk className="icon" />
          <input type='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
        </div>


        <div>
          <FaGlobe className="icon" />
          <input type='number' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}></input>
        </div>



        <div className="selector-container">
          <FaGlobeAmericas className="icon" />
          <select className="state-select" name='dono_state' onChange={(e) => setUserState(e.target.value)}>

            <option value=""> Select your state </option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>



        <div className="button-container">
          <FaPencilAlt className="register-icon" />
          <button onClick={() => submitRegistration()}>Register</button>
        </div>

        <div className="button-container">
          <FaPlayCircle className="back-icon" />
          <Link to="/"><button>Back</button></Link>
        </div>


      </div>
    </div>


  )
}

export default Register