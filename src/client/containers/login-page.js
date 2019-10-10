import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userNameChange } from '../actions'
import { playGame } from '../../common/actions'

class LoginPage extends React.Component {
  handleUsernameChange = (e) => {
    this.props.onUserNameChange(e.target.value)
    this.props.history.push('/board')
  }

  handleLogin = () => {
    this.props.onPlay(this.props.username)
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
  return { username }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserNameChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
