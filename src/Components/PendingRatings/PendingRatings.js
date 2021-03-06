import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PendingRatings.scss'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const PendingRatings = (props) => {
  const [pendingRatings, setPendingRatings] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${props.auth.user.user_id}/ratings`).then(res => {
      setPendingRatings(res.data)
    }).catch(err => alert(err.message))
  }, [props.auth.user])

  return (
    <div className="pending-ratings-container">
      <h1 className='header-div'>You have dono interactions that need to be rated.</h1>
      {pendingRatings.map(dono => {
        return (
          < DonoThumbnail
            dono={dono}
            key={dono.dono_id}
            pendingRating={true} />
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(PendingRatings)