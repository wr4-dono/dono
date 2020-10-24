import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateProfile } from '../../ducks/authReducer'


const Profile = (props) => {

  const [userInfo, setUserInfo] = useState({
    user_id: props.auth.user.user_id,
    username: props.auth.user.username,
    zip_code: props.auth.user.zip_code,
    email: props.auth.user.email
  })
  const [editMode, setEditMode] = useState(false)
  //  const [userRating, setUserRating] = useState({userGiverRating: ""})


  const { username, zip_code, email } = userInfo
  // const {userGiverRating} = userRating

  // useEffect (() =>{getUserRating()},[])



  // const getUserRating = () => {
  //   axios.get(`/api/users/${props.auth.user.user_id}/ratings/giverrating`).then(res =>
  //     setUserRating(res.data))

  // }


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
      {/* <p>{userGiverRating}</p> */}
      <div>
        {(editMode) ? (
          <div>
            <label>Username: <input name="username" placeholder={username} value={userInfo.username} onChange={handleChange} /></label>
            <label>Zip Code: <input name="zip_code" placeholder={zip_code} value={userInfo.zip_code} onChange={handleChange} /></label>
            <label>Email: <input name="email" placeholder={email} value={userInfo.email} onChange={handleChange} /></label>


            <button onClick={() => { handleSubmit(username, zip_code, email) }}>Save</button>
          </div>
        ) : (
            <div>
              <label >Username: <p>{username}</p> </label>
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