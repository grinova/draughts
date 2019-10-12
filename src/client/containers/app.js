import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginPage from './login-page'
import BoardPage from './board-page'
import { ROUTES } from '../config'

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <LoginPage/>
      </Route>
      <Route path={ROUTES.BOARD}>
        <BoardPage/>
      </Route>
    </Switch>
  </Router>
)

export default App
