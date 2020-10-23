import React, { useState } from 'react'
import './DonoThumbnail.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const DonoThumbnail = (props) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const favoriteDono = () => {
    axios.post(`/api/users/${props.auth.user.user_id}/favorites/${props.dono.dono_id}`)
    setIsFavorite(true)
    console.log(isFavorite)
  }

  const unfavoriteDono = () => {
    axios.delete(`/api/users/${props.auth.user.user_id}/favorites/${props.dono.dono_id}`)
    setIsFavorite(false)
    console.log(isFavorite)
  }

  return (

    <div className='dono-thumbnail' onClick={() => props.history.push({ pathname: '/dono', donoId: `${props.dono.dono_id}` })}>
      <div className='thumbnail-info'>
        {props.dono.title}
        {props.dono.price}
        {props.dono.zip_code}
      </div>
      <button
        className={isFavorite ? 'button-filled-in' : 'button-empty'}
        onClick={isFavorite ? (e) => {
          e.stopPropagation()
          unfavoriteDono()
        }
          :
          (e) => {
            e.stopPropagation()
            favoriteDono()
          }}
      >favorite</button>

      <div>
        <img className='thumbnail-picture' src={props.dono.picture_url} />
      </div>

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(withRouter(DonoThumbnail))