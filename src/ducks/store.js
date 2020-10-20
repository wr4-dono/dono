import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'
import donoReducer from './donoReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  dono: donoReducer,
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))