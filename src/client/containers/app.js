import React from 'react'
import { connect } from 'react-redux'
import { userNameChange, selectPiece } from '../actions'
import Board from '../components/board'
import Log from '../components/log'
import { playGame, move, leave } from '../../common/actions'
import { BLACK_MAN, isOwnPiece } from '../../common/game/common'

class App extends React.Component {
  handleCellOnClick = (pos) => {
    const { boardData } = this.props
    const { selected } = this.props
    const cell = boardData[pos.y][pos.x]
    if (selected) {
      if (pos.notEqual(selected) && cell.available) {
        this.props.onMove(selected, pos)
      }
      this.props.onSelectPiece(null)
    } else if (cell.movable) {
      this.props.onSelectPiece(pos)
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
  const boardData = field.map((row, y) => {
    return row.map((piece, x) => {
      const selected = sel && sel.x == x && sel.y == y
      const movable =
        !sel && isOwnPiece(side, piece) && moves[y][x].length > 0
      const available = sel && moves[sel.y][sel.x].some(pos => {
        return pos.x == x && pos.y == y
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
    onMove: (from, to) => dispatch(move({ from, to })),
    onLeave: () => dispatch(leave())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
