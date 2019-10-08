import React from 'react'
import { connect } from 'react-redux'
import { userNameChange, selectPiece } from '../actions'
import Board from '../components/board'
import Log from '../components/log'
import { playGame, move, leave } from '../../common/actions'

class App extends React.Component {
  handleCellOnClick = (i, j) => {
    const { selectedPiece } = this.props
    const pos = { row: i, column: j }
    if (!selectedPiece) {
      this.props.onSelectPiece(pos)
    } else {
      this.props.onSelectPiece(null)
      this.props.onMove(selectedPiece, pos)
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
        <Board data={this.props.field} onClick={this.handleCellOnClick}/>
        <Log>{this.props.log}</Log>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { username, selectedPiece, gameState: { field }, log } = state
  return { username, selectedPiece, field, log }
}

function mapDispatchToProps(dispatch) {
  return {
    userNameOnChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username)),
    onSelectPiece: (piece) => dispatch(selectPiece(piece)),
    onMove: (piece, pos) => dispatch(move({ from: piece, to: pos })),
    onLeave: () => dispatch(leave())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
