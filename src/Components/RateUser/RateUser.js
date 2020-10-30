import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './RateUser.scss'
import { connect } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import './RateUser.scss'

const RateUser = (props) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [dono, setDono] = useState({})
  const [otherUsername, setOtherUsername] = useState('')

  useEffect(() => {
    axios.get(`/api/donos/${props.match.params.dono_id}`).then
      (res => {
        setDono(res.data)
        if (res.data.giver_id === props.auth.user.user_id) {
          console.log('carrier', res.data.carrier_id)
          axios.get(`/api/auth/users/${res.data.carrier_id}`).then(res2 => {
            setOtherUsername(res2.data)
          })
        } else {
          console.log(res.data)
          console.log('giver', res.data.giver_id)
          axios.get(`/api/auth/users/${res.data.giver_id}`).then(res3 => {
            setOtherUsername(res3.data)
          })
        }
      })
    // axios.get(`/api/donos/29`).then(res => { setDono(res.data[0]) })
  }, [props.auth.user])


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
    <div className='rating-container'>
      <div className='rating-title'>You are rating: {otherUsername} </div>
      <ReactStars
        count={5}
        value={1}
        char={'★'}
        color={'gray'}
        activeColor={'#ffd700'}
        size={50}
        edit={true}
        isHalf={true}
        a11y={true}
        onChange={ratingChanged} />

      <label for=""><input type='text' placeholder='Comments regarding your experience' value={comment} onChange={handleChange} /></label>
      <p>*Note: {otherUsername} will see this rating/comment *</p>
      <button onClick={() => submitEverything()}>Submit Rating</button>

    </div>


  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(RateUser)