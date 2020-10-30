import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './Chat.css'
import axios from 'axios'
import { connect } from 'react-redux'

const socket = io.connect('http://localhost:4000')

function ChatBox(props) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.emit('join', { chatId: props.chatId }) // sends chatId to server
    // notes
    //.on receives events emitted
    //.emit sends events 

    socket.on('message', ({ username, message }) => {
      setChat(prev => [...prev, { username, message }])
    })
    getMessages();
  }, [props.auth.user])

  const getMessages = () => {
    axios.get(`/api/chat/${props.chatId}`).then(res => {
      setChat(res.data)
    })
  }

  const onTextChange = e => {
    setMessage(e.target.value)
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    socket.emit('message', { username: props.auth.user.username, message, chatId: props.chatId })

    axios.post(`/api/chat/${props.chatId}/users/${props.auth.user.user_id}`, { message }).then(res => console.log(res.status))

    setMessage('')
  }

  const renderChat = () => {
    document.title = "Chat Room"
    return chat.map(({ username, message }, index) => (
      <div key={index}>
        <h3 className='chat-message'>
          {username}: <span className="chat-span">{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <div>
        <div className="render-chat">
          {renderChat()}
        </div>
        <form className='chat-form' onSubmit={onMessageSubmit}>
          <div>
            <TextField  className='text-field'
              name="message"
              onChange={e => onTextChange(e)}
              value={message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button className='send-message-btn'>Send Message</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ChatBox)