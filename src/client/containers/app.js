import immutable from 'immutable'
import React from 'react'
import { connect } from 'react-redux'
import { userNameChange } from '../actions'
import Field from '../components/field'
import { playGame, userStep } from '../../common/actions'

class App extends React.Component {
  state = {
    chain: new immutable.List()
  }

  handleCellOnClick = (i, j) => {
    const { chain } = this.state
    const last = chain.last()
    if (last && last.i == i && last.j == j) {
      this.props.onStep(chain.toArray())
    } else {
      this.setState({ chain: this.state.chain.push({ i, j })})
    }
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
