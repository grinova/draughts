import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Board from '../components/board'
import { selectPiece } from '../actions'
import { move, leave } from '../../common/actions'
import { BLACK_MAN, isOwnPiece } from '../../common/game/common'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  board: {
    padding: theme.spacing(2, 2)
  },
  score: {
    padding: theme.spacing(2, 2)
  }
}))

const BoardPage = (props) => {
  const handleCellOnClick = (pos) => {
    const { boardData, selected } = props
    const cell = boardData[pos.y][pos.x]
    if (selected) {
      if (pos.notEqual(selected) && cell.available) {
        props.onMove(selected, pos)
      }
      props.onSelectPiece(null)
    } else if (cell.movable) {
      props.onSelectPiece(pos)
    }
  }

  const handleLeave = () => {
    props.onLeave()
  }

  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container
      justify='center'
      alignContent='center'
      spacing={2}
    >
      <Grid item>
        <Paper className={classes.board}>
          <Board
            reverse={props.reverse}
            data={props.boardData}
            onClick={handleCellOnClick}/>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classes.score}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleLeave}
          >
            Leave
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { selected: sel, gameInfo: { side }, gameState: { field }, moves } = state
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
  return { selected: sel, reverse, boardData }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectPiece: (piece) => dispatch(selectPiece(piece)),
    onMove: (from, to) => dispatch(move({ from, to })),
    onLeave: () => dispatch(leave())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
