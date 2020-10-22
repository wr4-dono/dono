import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

const Profile = (props) => {

  const [userInfo, setUserInfo] = useState ({
    username: props.auth.user.username,
    zip_code: props.auth.user.zip_code,
    email: props.auth.user.email
  })
   const [editMode, setEditMode] = useState(false)
  //  const [userRating, setUserRating] = useState({userGiverRating: ""})


  const {username, zip_code, email}  = userInfo
  // const {userGiverRating} = userRating

  // useEffect (() =>{getUserRating()},[])

  

  // const getUserRating = () => {
  //   axios.get(`/api/users/${props.auth.user.user_id}/ratings/giverrating`).then(res =>
  //     setUserRating(res.data))
      
  // }


  function handleChange(e){
    const{name, value} = e.target
    setUserInfo(state=> ({...state, [name]: value}))
  }

  const handleSubmit = (username, zip_code, email) => {
    axios.put('/api/profile/edit', {username, zip_code, email})
    .then(res => setUserInfo({
      username:username,
      zip_code:zip_code,
      email:email
    }))


      setEditMode(false)
  }


  return (
    <div> Profile.js
      {/* <p>{userGiverRating}</p> */}
      <div>
        {(editMode) ? (
          <div>
              <label for='username'>Username: <input name="username" onChange={handleChange} /></label>
              <label for='zip_code'>Zip Code: <input name="zip_code" onChange={handleChange} /></label>
              <label for='email'>Email: <input name="email" onChange={handleChange} /></label>
              

              <button onClick={() => {handleSubmit(username, zip_code, email)}}>Save</button>
          </div>
        ):(
          <div>
              <label for='username'>Username: <p>{username}</p> </label>
              <label for='zip_code'>Zip Code: <p>{zip_code}</p> </label>
              <label for='email'>E-mail: <p>{email}</p> </label>
          </div>
        )}
        </div>

        <div>
          {(editMode) ? (
          <div>
              <button onClick={() => setEditMode(!editMode)}>Cancel</button>
          </div>
        ):(
          <div>
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
          </div>
        )}
        </div>

       </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Profile)