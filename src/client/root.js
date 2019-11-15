import React from 'react'
import { Provider } from 'react-redux'
import App from './containers/app'
import Theme from './components/theme'

const Root = ({ store }) => (
  <Provider store={store}>
    <Theme>
      <App/>
    </Theme>
  </Provider>
)

export default Root
