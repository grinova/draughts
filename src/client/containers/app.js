import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginPage from './login-page'
import BoardPage from './board-page'
import { ROUTES } from '../config'
import Log from '../components/log'

const App = ({ log }) => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <LoginPage/>
      </Route>
      <Route path={ROUTES.BOARD}>
        <BoardPage/>
      </Route>
    </Switch>
    <Log>{log}</Log>
  </Router>
)

function mapStateToProps(state) {
  const { log } = state
  return { log }
}

export default connect(mapStateToProps)(App)
