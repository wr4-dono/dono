import React, { useState, useEffect } from 'react'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import './DonoThumbnail.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment-timezone'

const DonoThumbnail = (props) => {
  const [isFavorite, setIsFavorite] = useState(false)
  // if loading from the favorites.js component, would be nice to initialize this as true.

  useEffect(() => {
    const { favorites } = props
    if (favorites) { setIsFavorite(true) } console.log(props)
  }, [])

  const favoriteDono = () => {
    axios.post(`/api/users/${props.auth.user.user_id}/favorites/${props.dono.dono_id}`)
      .then(setIsFavorite(true))
    // console.log(isFavorite, 'favorite hit')
  }

  const unfavoriteDono = () => {
    axios.delete(`/api/users/${props.auth.user.user_id}/favorites/${props.dono.dono_id}`)
    setIsFavorite(false)
    // console.log(isFavorite, 'unfavorite hit')
  }

  return (
    <div className="thumbnail-container">
      <div className='dono-thumbnail' onClick={() => props.history.push(`/dono/${props.dono.dono_id}`)}>

        <div className="img-container">
          <img className='thumbnail-picture' src={props.dono.picture_url} alt={props.dono.title} />
        </div>


        <div className='thumbnail-info'>
          <p className='title'>{props.dono.title}</p>
          <p>Earn: <span className="bold">${props.dono.price}</span></p>
          <p>Zip code: <span className="bold">{props.dono.zip_code}</span></p>
          <p>{moment.utc(props.dono.created_at).fromNow()}</p>
        </div>

        <div>
          {(isFavorite) ?
            <BsHeartFill className='button-filled-in'
              onClick={(e) => {
                e.stopPropagation()
                unfavoriteDono()
              }} />
            :
            <BsHeart className='button-empty'
              onClick={(e) => {
                e.stopPropagation()
                favoriteDono()
              }} />
          }
        </div>

        {/* <p
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
      >★</p> */}



      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(withRouter(DonoThumbnail))