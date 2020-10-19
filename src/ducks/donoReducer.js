import axios from 'axios'

const initialState = {
  donos: [],
  isFavorited: false,
  isAccepted: false,
  isCompleted: false
}

const GET_DONOS = 'GET_DONOS'
const FAVORITE_DONO = 'FAVORITE_DONO'
const UNFAVORITE_DONO = 'UNFAVORITE_DONO'
const ACCEPT_DONO = 'ACCEPT_DONO'
const COMPLETE_DONO = 'COMPLETE_DONO'

export function getDonos() {
  const payload = axios.get('/api/donos')

  return {
    type: GET_DONOS,
    payload: payload
  }
}

export function favoriteDono(user_id, dono_id) {
  const payload = axios.post(`/api/users/${user_id}/donos/${dono_id}`)

  return {
    type: FAVORITE_DONO,
    payload: payload
  }
}

export function unfavoriteDono(user_id, favorite_id) {
  const payload = axios.delete(`/api/users/${user_id}/favorites/${favorite_id}`)

  return {
    type: UNFAVORITE_DONO,
    payload: payload
  }
}

export function acceptDono(dono_id) {
  //right now we have user_id coming off of session
  const payload = axios.put(`/api/donos/${dono_id}`)

  return {
    type: ACCEPT_DONO,
    payload: payload
  }
}

export function completeDono(dono_id) {
  //user_id coming off of session right here as well. also the same endpoint? didn't have endpoint to reference here.
  const payload = axios.put(`/api/donos/${dono_id}`)

  return {
    type: COMPLETE_DONO,
    payload: payload
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DONOS + '_PENDING':
      return { ...state }
    case GET_DONOS + '_FULFILLED':
      return { ...state, donos: action.payload.data }
    case GET_DONOS + '_REJECTED':
      return initialState
    case FAVORITE_DONO + '_PENDING':
      return { ...state }
    case FAVORITE_DONO + '_FULFILLED':
      return { ...state, isFavorited: true }
    case FAVORITE_DONO + '_REJECTED':
      return initialState
    case UNFAVORITE_DONO + '_PENDING':
      return { ...state }
    case UNFAVORITE_DONO + '_FULFILLED':
      return { ...state, isFavorited: false }
    case UNFAVORITE_DONO + '_REJECTED':
      return initialState
    case ACCEPT_DONO + '_PENDING':
      return initialState
    case ACCEPT_DONO + '_FULFILLED':
      return { ...state, isAccepted: true }
    case ACCEPT_DONO + '_REJECTED':
      return initialState
    case COMPLETE_DONO + '_PENDING':
      return { ...state }
    case COMPLETE_DONO + '_FULFILLED':
      return { ...state, isCompleted: true }
    case COMPLETE_DONO + '_REJECTED':
      return initialState
    default:
      return state
  }
}