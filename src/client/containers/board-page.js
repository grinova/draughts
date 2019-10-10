import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Board from '../components/board'
import Log from '../components/log'
import { selectPiece } from '../actions'
import { move, leave } from '../../common/actions'
import { BLACK_MAN, isOwnPiece } from '../../common/game/common'

class BoardPage extends React.Component {
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

  handleLeave = () => {
    this.props.history.push('/')
    this.props.onLeave()
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleLeave}>Leave</button>
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
  const { selected: sel, gameInfo: { side }, gameState: { field }, moves, log } = state
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
  return { selected: sel, reverse, boardData, log }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectPiece: (piece) => dispatch(selectPiece(piece)),
    onMove: (from, to) => dispatch(move({ from, to })),
    onLeave: () => dispatch(leave())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardPage))
