import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PendingDonos.scss'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const PendingDonos = (props) => {
  const [pendingDonos, setPendingDonos] = useState([])

  useEffect(() => {
    axios.get(`/api/donos/pending/${props.auth.user.user_id}`)
      .then((res) => setPendingDonos(res.data)).catch(err => console.log(err.message))

  }, [])

  return (
    <div>
      <p className="pending-p">Pending Pickups</p>
      {pendingDonos.map(dono => {
        return (
          < DonoThumbnail
            dono={dono}
            key={dono.id}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(PendingDonos)