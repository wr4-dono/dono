import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profile.scss'
import { connect } from 'react-redux'
import { updateProfile } from '../../ducks/authReducer'
import ReactStars from 'react-rating-stars-component'




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


  const { username, user_state, zip_code, email } = userInfo


  useEffect(() => {
    axios.get(`/api/users/${props.auth.user.user_id}/ratings/giverrating`)
      .then(res => setGiverRating(+res.data.avg))
      .catch(err => console.log(err.message))

  }
    , [props.auth.user])

  useEffect(() => {
    axios.get(`/api/users/${props.auth.user.user_id}/ratings/carrierrating`)
      .then(res => setCarrierRating(+res.data.avg))
      .catch(err => console.log(err.message))
  }
    , [props.auth.user])

  console.log(typeof giverRating)
  console.log(typeof carrierRating)

  function handleChange(e) {
    const { name, value } = e.target
    setUserInfo(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = (username, user_state, zip_code, email) => {
    axios.put('/api/profile/edit', { username, user_state, zip_code, email })
      .then(res => setUserInfo({
        user_id: props.auth.user.user_id,
        user_state: user_state,
        username: username,
        zip_code: zip_code,
        email: email
      }))

    props.updateProfile(userInfo)
    setEditMode(false)
  }



  return (

    <div className = "profile-container">
      <h1>{username}'s Profile</h1>
      <div className="user-ratings"><p>Carrier Rating: {carrierRating ? (<>
        <ReactStars
          count={5}
          value={carrierRating}
          char={'★'}
          activeColor={'#ffd700'}
          size={'20px'}
          isHalf={true}
          edit={false} />
        <p> {carrierRating} out of 5</p>
      </>) : (<>
        None </>)} </p></div>

      <div className="user-ratings"><p>Giver Rating: {giverRating ? (<>
        <ReactStars
          count={5}
          value={giverRating}
          char={'★'}
          activeColor={'#ffd700'}
          size={'20px'}
          isHalf={true}
          edit={false} />
        <p>{giverRating} out of 5</p>
      </>) : (<>
        None </>)}</p></div>

      <div>
        {(editMode) ? (
          <div className="label-info">
            
            <div>
              <label>Username: <input name="username" placeholder={username} value={userInfo.username} onChange={handleChange} /></label>
            </div>

            <div className="selector-container">
              <label for='state-select' >State:</label>
            
            <select name='user_state' className="state-select" value={userInfo.user_state} onChange={handleChange}>
              <option value="">-- Select State --</option>
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
            <div>
              <label>Zip Code: <input name="zip_code" placeholder={zip_code} value={userInfo.zip_code} onChange={handleChange} /></label>
            </div>
            <div>
              <label>Email: <input name="email" placeholder={email} value={userInfo.email} onChange={handleChange} /></label>
            </div>


            <div className="button-div">
              <button onClick={() => { handleSubmit(username, user_state, zip_code, email) }}>Save</button>
            </div>
          </div>
        ) : (
            <div className="label-info">
              <div className="info-div">
                <label >Username: {username}</label>
              </div>
              <div className="info-div">
                <label >State: {user_state}</label>
              </div>
              <div className="info-div">
                <label >Zip Code: {zip_code} </label>
              </div>
              <div className="info-div">
                <label >Email: {email} </label>
              </div>
            </div>
          )}
      </div>

      <div>
        {(editMode) ? (
          <div className="button-div">
            <button onClick={() => setEditMode(!editMode)}>Cancel</button>
          </div>
        ) : (
            <div className="button-div">
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
            </div>
          )}
      </div>

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { updateProfile })(Profile)