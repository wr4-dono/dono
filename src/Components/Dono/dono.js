import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


const Dono = (props) => {
  const [donoInfo, setDonoInfo] = useState({});

  useEffect(() => {
    axios.get(`/api/donos/${props.match.params.dono_id}`).then(res => setDonoInfo(res.data))
  }, [])


  const acceptDono = () => {
    axios.put(`/api/users/${props.auth.user.user_id}/dono/${donoInfo.dono_id}`).then(res => {

      axios.post(`/api/dono/${donoInfo.dono_id}/chat`, { giver_id: donoInfo.giver_id, carrier_id: props.auth.user.user_id }).then(res => {
        props.history.push(`/AcceptedDono/${donoInfo.dono_id}/${res.data.chat_id}`)
      }).catch(err => alert(err.message))
    }).catch(err => alert(err.message))
  }

  const continueChatting = () => {
    axios.get(`/api/dono/${donoInfo.dono_id}/chat`).then(res => {
      props.history.push(`/AcceptedDono/${donoInfo.dono_id}/${res.data.chat_id}`)
    }).catch(err => alert(err.message))
  }

  return (
    <div className='dono-container'>
      <img src={donoInfo.picture_url} ></img>
      <div>
        <h2>{donoInfo.title}</h2>
        <div>${donoInfo.price}</div>
      </div>
      <div>{donoInfo.description}</div>
      <div>
        <div>{donoInfo.multiple_people}</div>
        <div>{donoInfo.truck_trailer}</div>
      </div>

      <div>zip code: {donoInfo.zip_code}</div>

      {/* The Ternary below will display the edit button if they are the owner of the dono. If they are not they will see the accept button. If it has already been accepted and they are not the owner no buttons will display at the moment.   */}
      {(donoInfo.giver_id === props.auth.user.user_id) ?
        (donoInfo.carrier_id) ?
          <button onClick={() => continueChatting()}>Continue Chatting</button>
          :
          <button onClick={() => props.history.push({ pathname: '/new', donoInfo: donoInfo })}>Edit Dono</button>
        :
        (donoInfo.carrier_id) ?
          (donoInfo.carrier_id === props.auth.user.user_id) ?
            <button onClick={() => continueChatting()}>Continue Chatting</button>
            :
            null
          :
          <button type="submit" onClick={() => acceptDono()}>Accept Dono</button>}

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dono)