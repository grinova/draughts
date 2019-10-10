import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginPage from './login-page'
import BoardPage from './board-page'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <LoginPage/>
      </Route>
      <Route path='/board'>
        <BoardPage/>
      </Route>
    </Switch>
  </Router>
)

export default App
