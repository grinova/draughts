import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userNameChange } from '../actions'
import { ROUTES } from '../config'
import { playGame } from '../../common/actions'
import { PLAY } from '../../common/state'

class LoginPage extends React.Component {
  handleUsernameChange = (e) => {
    this.props.onUserNameChange(e.target.value)
  }

  handleLogin = () => {
    this.props.onPlay(this.props.username)
  }

  componentDidUpdate() {
    const { history, state } = this.props
    if (state == PLAY) {
      history.push(ROUTES.BOARD)
    }
  }

  render() {
    return (
      <React.Fragment>
        <input
          type='text'
          placeholder='enter user name'
          defaultValue={this.props.username}
          onChange={this.handleUsernameChange}/>
        <button onClick={this.handleLogin}>Play</button>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { username } = state
  return { state: state.state, username }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserNameChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
