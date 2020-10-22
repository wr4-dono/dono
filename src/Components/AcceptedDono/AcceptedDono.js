import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DonoThumbnail from '../DonoThumbnail/DonoThumbnail'
import ChatBox from './ChatBox'

const AcceptedDono = (props) => {
  const [donoInfo, setDonoInfo] = useState({})
  const [chatId, setChatId] = useState(props.match.params.chat_id)

  useEffect(() => {
    console.log(props)
    // axios.get(`/api/donos/${props.match.params.dono_id}`).then(res => setDonoInfo(res.data))
    axios.get(`/api/donos/23`).then(res => setDonoInfo(res.data))
  }, [])

  const pickupComplete = () => {
    axios.put(`/api/dono/${donoInfo.dono_id}`).then(res => props.history.push('/pending'))
  }

  return (
    <div>
      {console.log('chatId', chatId)}
      <div>
        <DonoThumbnail dono={donoInfo} />
      </div>
      <div>
        <ChatBox chatId={chatId} />
      </div>

      <div>
        <button onClick={() => pickupComplete()}>Pickup Complete</button>
      </div>
    </div>
  )
}

export default AcceptedDono