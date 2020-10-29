import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './landing.scss'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const LandingPage = (props) => {
  const [radius, setRadius] = useState('')
  const [donos, setDonos] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    const { zip_code } = props.auth.user
    axios.get(`/api/donos?status=1&state=${props.auth.user.user_state}&zip_code=${zip_code}&radius=${radius}&search=${search}`)
      .then((res) => setDonos(res.data)).catch(err => console.log(err.message))
  }, [props.auth.user.zip_code, props.auth.user.user_state])

  const searchDonos = () => {
    const { zip_code } = props.auth.user
    axios.get(`/api/donos?status=1&state=${props.auth.user.user_state}&zip_code=${zip_code}&radius=${radius}&search=${search}`).then(res => {
      setDonos(res.data)
    }).catch(err => {
      if (err.message === 'Request failed with status code 416') {
        alert("Search radius must be greater than 0")
      } else {
        alert(err.message)
      }
    })
  }


  return (
    <div className="landing-container">
      <div className="input-container">
        <input type='text' placeholder='Search Title' onChange={(e) => setSearch(e.target.value)}></input>
        <input type='number' placeholder='Distance In Miles' onChange={(e) => setRadius(e.target.value)}></input>
        <button onClick={() => searchDonos()}>Search Donos</button>
      </div>
      {donos.map(dono => {
        return <DonoThumbnail dono={dono} />
      })}
    </div>
  )
}



const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(LandingPage)