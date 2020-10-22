import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './Chat.css'
import axios from 'axios'
import { connect } from 'react-redux'

const socket = io.connect('http://localhost:4000')

function ChatBox(props) {
  const [state, setState] = useState({ message: '', username: '' })
  const [chat, setChat] = useState([])
  const [chatId, setChatId] = useState(props.chatId)

  useEffect(() => {
    socket.on('message', ({ username, message }) => {
      setChat([...chat, { username, message }])
    })
    getMessages();
  }, [])

  const getMessages = () => {
    // axios.get(`/api/chat/${chatId}`).then(res => {
    axios.get(`/api/chat/1`).then(res => {
      setChat(res.data)
    })
  }

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { username, message } = state
    socket.emit('message', { username, message })

    axios.post(`/api/chat/${chatId}/users/${props.auth.user.user_id}`, { message }).then(res => console.log(res.status))

    setState({ message: '', username })
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
      <h1>{props.auth.user.username}</h1>
      <form onSubmit={onMessageSubmit}>
        {/* <div className="name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.username}
            label="Name"
          />
        </div> */}
        <div>
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1 className='chat-log'>Chat Log:</h1>
        {renderChat()}
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ChatBox)