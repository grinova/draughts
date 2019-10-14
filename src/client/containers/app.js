import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import LoginPage from './login-page'
import BoardPage from './board-page'
import { ROUTES } from '../config'
import { DEFAULT, PLAY } from '../../common/state'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #cdcdcd;
  }
`

class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { history, state } = this.props
    if (prevProps.state == DEFAULT && state == PLAY) {
      history.push(ROUTES.BOARD)
    } else if (prevProps.state == PLAY && state == DEFAULT) {
      history.push(ROUTES.HOME)
    }
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyles/>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <LoginPage/>
          </Route>
          <Route path={ROUTES.BOARD}>
            <BoardPage/>
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { log } = state
  return { state: state.state, log }
}

export default withRouter(connect(mapStateToProps)(App))
