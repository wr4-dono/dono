import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateProfile } from '../../ducks/authReducer'


const Profile = (props) => {

  const [userInfo, setUserInfo] = useState({
    user_id: props.auth.user.user_id,
    username: props.auth.user.username,
    user_state: props.auth.user.user_state,
    zip_code: props.auth.user.zip_code,
    email: props.auth.user.email
  })
   const [editMode, setEditMode] = useState(false)
   const [giverRating, setGiverRating] = useState(null)
   const [carrierRating, setCarrierRating] = useState(null)


  const {username, user_state, zip_code, email}  = userInfo
  

  useEffect (() =>{axios.get(`/api/users/${props.auth.user.user_id}/ratings/giverrating`).then(res =>
    setGiverRating(res.data.avg)).catch(err => console.log(err.message))}
     , [])

     useEffect(() => {axios.get(`/api/users/${props.auth.user.user_id}/ratings/carrierrating`).then(res =>
      setCarrierRating(res.data.avg)).catch(err => console.log(err.message))}
      , [])

    

  function handleChange(e) {
    const { name, value } = e.target
    setUserInfo(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = (username, zip_code, email) => {
    axios.put('/api/profile/edit', { username, zip_code, email })
      .then(res => setUserInfo({
        user_id: props.auth.user.user_id,
        username: username,
        zip_code: zip_code,
        email: email
      }))

    props.updateProfile(userInfo)
    setEditMode(false)
  }

  

  return (

    <div> 
      Profile.js
    
      <div><p>Carrier Rating: {carrierRating ? carrierRating : 'You have not received any ratings'} </p></div>
     <div><p>Giver Rating: {giverRating}</p></div>
      
      <div>
        {(editMode) ? (
          <div>
            <label>Username: <input name="username" placeholder={username} value={userInfo.username} onChange={handleChange} /></label>
            <label>State: <input name="user_state" placeholder={user_state} value={userInfo.user_state} onChange={handleChange} /></label>
            <label>Zip Code: <input name="zip_code" placeholder={zip_code} value={userInfo.zip_code} onChange={handleChange} /></label>
            <label>Email: <input name="email" placeholder={email} value={userInfo.email} onChange={handleChange} /></label>


            <button onClick={() => { handleSubmit(username, zip_code, email) }}>Save</button>
          </div>
        ) : (
            <div>
              <label >Username: <p>{username}</p> </label>
              <label >State: <p>{user_state}</p> </label>
              <label >Zip Code: <p>{zip_code}</p> </label>
              <label >E-mail: <p>{email}</p> </label>
            </div>
          )}
      </div>

      <div>
        {(editMode) ? (
          <div>
            <button onClick={() => setEditMode(!editMode)}>Cancel</button>
          </div>
        ) : (
            <div>
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
            </div>
          )}
      </div>

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { updateProfile })(Profile)