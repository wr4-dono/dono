import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [userState, setUserState] = useState('')
  const [zip_code, setZipCode] = useState(null)


  const submitRegistration = () => {
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
        <label for='state-select'>Select Dono State:</label>
        <select name='dono_state' onChange={(e) => setUserState(e.target.value)}>
          <option value="">-- Please choose an option --</option>
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
        <label> Your Zip code:
        <input type='number' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}></input>
        </label>
        <button onClick={() => submitRegistration()}>Register</button>
      </div>
    </div>
  )
}

export default Register