import React from 'react'
import { connect } from 'react-redux'
import { userNameChange, selectPiece } from '../actions'
import Field from '../components/field'
import { playGame, userStep, leave } from '../../common/actions'

class App extends React.Component {
  handleCellOnClick = (i, j) => {
    const { selectedPiece } = this.props
    const pos = { row: i, column: j }
    if (!selectedPiece) {
      this.props.onSelectPiece(pos)
    } else {
      this.props.onSelectPiece(null)
      this.props.onStep(selectedPiece, pos)
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
        <button onClick={this.props.onLeave}>Leave</button>
        <Field data={this.props.field} onClick={this.handleCellOnClick}/>
        <div>State: {this.props.state}</div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    selectedPiece: state.selectedPiece,
    field: state.gameState.field,
    state: state.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userNameOnChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username)),
    onSelectPiece: (piece) => dispatch(selectPiece(piece)),
    onStep: (piece, pos) => dispatch(userStep({ from: piece, to: pos })),
    onLeave: () => dispatch(leave())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
