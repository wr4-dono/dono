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
   const [giverRating, setgiverRating] = useState({})
   const [carrierRating, setCarrierRating] = useState({})


  const {username, zip_code, email}  = userInfo
  

  useEffect (() =>{axios.get(`/api/users/${props.auth.user.user_id}/ratings/giverrating`).then(res =>
    setgiverRating(res.data)).catch(err => console.log(err.message))},
    axios.get(`/api/users/${props.auth.user.user_id}/ratings/carrierrating`).then(res =>
      setCarrierRating(res.data)).catch(err => console.log(err.message))
     ,[])

      

     

     


  


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

    <div> 
      Profile.js
    
      <div><p>Carrier Rating: {carrierRating.avg}</p></div>
     <div><p>Giver Rating: {giverRating.avg}</p></div>
      
      <div>
        {(editMode) ? (
          <div>
              <label >Username: <input name="username" placeholder= {username} onChange={handleChange} /></label>
              <label >Zip Code: <input name="zip_code" placeholder= {zip_code} onChange={handleChange} /></label>
              <label >Email: <input name="email" placeholder= {email} onChange={handleChange} /></label>
              

              <button onClick={() => {handleSubmit(username, zip_code, email)}}>Save</button>
          </div>
        ):(
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