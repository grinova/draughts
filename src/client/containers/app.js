import React from 'react'
import { connect } from 'react-redux'
import { userNameChange, selectPiece } from '../actions'
import Board from '../components/board'
import Log from '../components/log'
import { playGame, move, leave } from '../../common/actions'
import { BLACK_MAN, isOwnPiece } from '../../common/game/common'

class App extends React.Component {
  handleCellOnClick = (i, j) => {
    const { selected } = this.props
    const pos = { row: i, column: j }
    if (!selected) {
      this.props.onSelectPiece(pos)
    } else {
      this.props.onSelectPiece(null)
      this.props.onMove(selected, pos)
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
        <Board
          reverse={this.props.reverse}
          data={this.props.boardData}
          onClick={this.handleCellOnClick}/>
        <Log>{this.props.log}</Log>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { username, selected: sel, gameInfo: { side }, gameState: { field }, moves, log } = state
  const boardData = field.map((row, i) => {
    return row.map((piece, j) => {
      const selected = sel && sel.row == i && sel.column == j
      const movable =
        !sel && isOwnPiece(side, piece) && moves[i][j].length > 0
      const available = sel && moves[sel.row][sel.column].some(pos => {
        return pos.y == i && pos.x == j
      })
      return { piece, selected, side, movable, available }
    })
  })
  const reverse = side == BLACK_MAN
  return { username, selected: sel, reverse, boardData, log }
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
