import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const Favorites = (props) => {
  const [favoritedDonos, setFavoritedDonos] = useState([])
  const [favorites, setFavorites] = useState(true)

  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = () => {
    axios.get(`/api/users/${props.auth.user.user_id}/favorites`)
      .then((res) => setFavoritedDonos(res.data)).catch(err => console.log(err.message))
  }

  return (
    <div>
      <p>Favorites</p>

      {favoritedDonos.map(dono => {
        return <DonoThumbnail
          dono={dono}
          favorites={favorites}
          getFavorites={getFavorites} />
      })}



    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Favorites)
