import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './containers/app'
import Theme from './components/theme'
import configureStore from './store'

const store = configureStore()

render(
  <Provider store={store}>
    <Router>
      <Theme>
        <App/>
      </Theme>
    </Router>
  </Provider>,
  document.getElementById('root')
)

store.subscribe(() => console.log(store.getState()))
