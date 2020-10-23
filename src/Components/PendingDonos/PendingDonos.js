import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'

const PendingDonos = () => {
  const [pendingDonos, setPendingDonos] = useState([])

    useEffect(() => {
      axios.get(`/api/donos?status=2`)
      .then((res) => setPendingDonos(res.data)).catch(err => console.log(err.message))

    }, [])

  return (
    <div> PendingDonos.js 
    {pendingDonos.map(dono => {
      return(
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