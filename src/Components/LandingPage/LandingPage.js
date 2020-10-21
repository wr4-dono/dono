import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const LandingPage = (props) => {
  const [radius, setRadius] = useState('')
  //set radius determined by input by user or potentially drop down selection.
  const [donos, setDonos] = useState([])

  useEffect(() => {
    const { zip_code } = props.auth.user
    console.log(radius)
    axios.get(`/api/donos?status=1&zip_code=${zip_code}&radius=${radius}`)
      .then((res) => setDonos(res.data)).catch(err => console.log(err.message))
  }, [props.auth.user.zip_code, radius])



  return (
    <div>
      <input type='number' placeholder='Distance In Miles' onChange={(e) => setRadius(e.target.value)}></input>
      {/* <button onClick={()=> submitDistance()}>Get Donos</button> */}
      {donos.map(dono => {
        return <DonoThumbnail dono={dono} />
      })}
    </div>
  )
}



const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(LandingPage)