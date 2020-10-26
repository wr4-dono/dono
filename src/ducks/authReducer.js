import axios from 'axios'

const initialState = {
  user: {},
  isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'
const UPDATE_PROFILE = 'UPDATE_PROFILE'

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function getUser() {
  const payload = axios.get('/auth/user')

  return {
    type: GET_USER,
    payload: payload
  }
}

export function updateProfile(user) {
  return {
    type: UPDATE_PROFILE,
    payload: user
  }
}

export default function (state = initialState, action) {
  // console.warn(state)
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload, isLoggedIn: true }
    case LOGOUT_USER:
      return initialState
    case UPDATE_PROFILE:
      return { ...state, user: action.payload, isLoggedIn: true }
    case GET_USER + '_PENDING':
      return { ...state }
    case GET_USER + '_FULFILLED':
      return { ...state, user: action.payload.data, isLoggedIn: true }
    case GET_USER + '_REJECTED':
      return initialState
    default:
      return state
  }
}