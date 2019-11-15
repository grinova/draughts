import { applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import configureServerStore from './server'

export default function configureStore(state) {
  const url = new URL(window.location.href)
  url.pathname = ''
  url.search = ''
  const socket = io(url.href)
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')
  return configureServerStore(state, applyMiddleware(socketIoMiddleware))
}
