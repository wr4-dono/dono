import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'
import ChatBox from './ChatBox'
import "./Chat.css"

const AcceptedDono = (props) => {
  const [donoInfo, setDonoInfo] = useState({})
  const [chatId, setChatId] = useState(props.match.params.chat_id)
  const [otherUsername, setOtherUsername] = useState('')

  useEffect(() => {
    console.log(props)
    axios.get(`/api/donos/${props.match.params.dono_id}`).then(res => {
      setDonoInfo(res.data)
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
  }, [props.auth.user])

  const pickupComplete = () => {
    axios.put(`/api/dono/${donoInfo.dono_id}?status=3`).then(res => props.history.push(`/rate/${donoInfo.dono_id}`))
  }

  return (
    <div style={{ paddingTop: 110 + 'px' }}>
      <div>
        <DonoThumbnail dono={donoInfo} />
      </div>
      <div>
        <h1>Chatting with {otherUsername}</h1>
        <ChatBox chatId={chatId} />
      </div>

      <div>
        <button className='pickup-complete' onClick={() => pickupComplete()}>Pickup Complete</button>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(AcceptedDono)