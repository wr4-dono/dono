import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const LandingPage = (props) => {
  const [radius, setRadius] = useState(null)
  //set radius determined by input by user or potentially drop down selection.
  const [donos, setDonos] = useState([])

  useEffect(() => {
    axios.get(`/api/donos?status=1&zip_code=${props.user.zip_code}&radius=${radius}`)
      .then((res) => setDonos(res.data))
  }, [props.user.zip_code, radius])

  return (
    <div>LandingPage.js
      {donos.map(dono => {
        return <DonoThumbnail dono={dono} />
      })}
    </div>
  )
}



const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(LandingPage)