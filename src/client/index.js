import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import App from './components/app'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

import io from 'socket.io-client'
const url = new URL(window.location.href)
url.pathname = ''
url.search = ''
var socket = io(url.href)
socket.on('connect', () => {
  socket.emit('my-client-event', { text: 'Event from client' })
})
socket.on('my-server-event', (data) => { console.log(data) })
socket.on('disconnect', () => {})
