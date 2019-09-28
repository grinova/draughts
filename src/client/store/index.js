import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { userNameChange } from '../actions'
import { getUserName } from '../helpers/url'
import rootReducer from '../reducers'

export default function configureStore() {
  const url = new URL(window.location.href)
  url.pathname = ''
  url.search = ''
  const socket = io(url.href)
  const socketIoMiddleware = createSocketIoMiddleware(socket, "server/")
  const store = createStore(rootReducer, applyMiddleware(socketIoMiddleware))
  store.dispatch(userNameChange(getUserName(window.location.href, 'username')))
  return store
}
