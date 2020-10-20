import React from 'react'
import axios from 'axios'

const RateUser = () => {

  const rate = () => {
    axios.post('/api/users/ratingTest')
  }

  return (
    <div> 
      RateUser.js 



        <form>
        <button type ="submit" onClick={()=>rate()}>Rate Test</button>
      </form>
    </div>

    
  )
}

export default RateUser