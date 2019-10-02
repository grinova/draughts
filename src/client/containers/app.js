import React from 'react'
import { connect } from 'react-redux'
import { userNameChange } from '../actions'
import Field from '../components/field'
import { playGame, userStep } from '../../common/actions'

class App extends React.Component {
  state = {
    move: []
  }

  handleCellOnClick = (i, j) => {
    const { move } = this.state
    move.push({ row: i, column: j })
    this.setState({ move }, () => {
      const { move } = this.state
      if (move.length >= 2) {
        this.props.onStep({ from: move[0], to: move[1] })
        this.setState({ move: [] })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <input
          type='text'
          placeholder='enter user name'
          defaultValue={this.props.username}
          onChange={(e) => this.props.userNameOnChange(e.target.value)}/>
        <button onClick={() => this.props.onPlay(this.props.username)}>Play</button>
        <Field data={this.props.field} onClick={this.handleCellOnClick}/>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return { username: state.username, field: state.gameState.field }
}

function mapDispatchToProps(dispatch) {
  return {
    userNameOnChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username)),
    onStep: (chain) => dispatch(userStep(chain))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
