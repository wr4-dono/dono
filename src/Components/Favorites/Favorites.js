import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const Favorites = (props) => {
  const [favoritedDonos, setFavoritedDonos] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${props.auth.user.user_id}/favorites`)
    .then((res) => setFavoritedDonos(res.data)).catch(err => console.log(err.message))
  }, [])

  return (
    <div>
      <p>Favorites</p>

      {favoritedDonos.map(dono => {
        return <DonoThumbnail dono ={dono} />
      })}
    {/* {favoritedDonos.map(dono => {
      return
        < DonoThumbnail 
          dono={dono}
        />
      
    })} */}

    
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Favorites)
