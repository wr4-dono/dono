import React, { useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

const Profile = () => {

  const [userInfo, setUserInfo] = ({
    username: '',
    zip_code: '',
    email: ''
  })
   const [editMode, setEditMode] = useEffect(false)

  const {username, zip_code, email}  = userInfo


  function handleChange(e){
    const{name, value} = e.target
    setUserInfo(state=> ({...state, [name]: value}))
  }

  const handleSubmit = (username, zip_code, email) => {


      setEditMode(false)
  }


  return (
    <div> Profile.js
      <div>
          {(editMode)?(
        <div>

        </div>
      ):(
      <div>

      </div>
      )}
      </div>

      <div>
        {(editMode)?(
          <div>
              <label for='username'>Username: <input name="usrname" onChange={handleChange} /></label>
              <lable for='zip_code'>Zip Code: <input name="zip_code" onChange={handleChange} /></lable>
              <lable for='email'>Email: <inpit name="email" onChange={handleChange} /></lable>
              

              <button onClick={() => {handleSubmit(username, zip_code, email)}}>Save</button>
          </div>
        ):(
          <div>
              <label for="username">Username: </label>
          </div>
        )}
      </div>
      
      
      
       </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Profile)