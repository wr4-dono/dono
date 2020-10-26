import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactStars from 'react-rating-stars-component'

const RateUser = (props) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [dono, setDono] = useState({})

  useEffect(() => {
    axios.get(`/api/donos/${props.match.params.dono_id}`).then
      (res => { setDono(res.data) })
    // axios.get(`/api/donos/29`).then(res => { setDono(res.data[0]) })
  }, [])


  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setComment(value)
    console.log(comment)
  }

  const submitEverything = () => {
    const { giver_id, carrier_id } = dono
    if (props.auth.user.user_id === dono.carrier_id) {
      axios.post(`/api/users/${dono.dono_id}/ratings/giver`, { rating, comment, giver_id })
      sendGiverEmail()
    } else {
      axios.post(`/api/users/${dono.dono_id}/ratings/carrier`, { rating, comment, carrier_id })
      sendCarrierEmail()
    }
    props.history.push('/landing')
  }

  const sendGiverEmail = () => {
    const { giver_id } = dono
    axios.post('/api/users/giveremail', { rating, comment, giver_id })
  }

  const sendCarrierEmail = () => {
    const { carrier_id } = dono
    axios.post('/api/users/carrieremail', { rating, comment, carrier_id })
  }


  return (
    <div>
      <ReactStars
        count={5}
        value={1}
        char={'★'}
        color={'gray'}
        activeColor={'#ffd700'}
        size={'20px'}
        edit={true}
        isHalf={true}
        a11y={true}
        onChange={ratingChanged} />

      <input type='text' value={comment} onChange={handleChange} />

      <button onClick={() => submitEverything()}>Submit Rating</button>

    </div>


  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(RateUser)