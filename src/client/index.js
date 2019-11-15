import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/client'
import Root from './root'

const state = window.__STATE__
delete window.__STATE__
const store = configureStore(state)

hydrate(
  <BrowserRouter>
    <Root store={store}/>
  </BrowserRouter>,
  document.getElementById('root')
)

store.subscribe(() => console.log(store.getState()))
