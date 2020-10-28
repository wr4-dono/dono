import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const PendingRatings = (props) => {
  const [pendingRatings, setPendingRatings] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${props.auth.user.user_id}/ratings`).then(res => {
      setPendingRatings(res.data)
    }).catch(err => alert(err.message))
  }, [])

  return (
    <div>
      <p className='pending-ratings'>Pending Ratings</p>
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