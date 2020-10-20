import React from 'react'
import axios from 'axios'

const Dono = () => {


  const accept = () => {
    axios.post('/api/donos/acceptTest')
  }

  return (
    <div className='dono-container'>dono.js
      <div>image</div>
      <div>title</div>
      <div>description and info</div>
      <button>Accept Dono (conditionally rendered)</button>

      <form>
        <button type ="submit" onClick={()=>accept()}>Accept Test</button>
      </form>

    </div>
  )
}

export default Dono