import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Board from '../components/board'
import Score from '../components/score'
import { selectPiece } from '../actions'
import { move, leave } from '../../common/actions'
import { BLACK_MAN, getOrder, isOwnPiece } from '../../common/game/common'

const useStyles = makeStyles(theme => ({
  root: {
  },
  info: {
    height: '100%'
  },
  infoPaper: {
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
    <Container>
      <Grid
        className={classes.root}
        container
        justify='center'
        alignContent='center'
        spacing={2}
      >
        <Grid item>
          <Paper>
            <Board
              reverse={props.reverse}
              data={props.boardData}
              onClick={handleCellOnClick}/>
          </Paper>
        </Grid>
        <Grid item>
          <Grid container
            className={classes.info}
            direction='column'
            justify='space-between'
            alignItems='center'
            spacing={2}
          >
            <Grid item>
              <Score>{props.info}</Score>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleLeave}
              >
                Leave
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

function mapStateToProps(state) {
  const { selected: sel, gameInfo: { side, players }, gameState: { field, score }, moves } = state
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
  const info = { players, score, side }
  return { selected: sel, reverse, boardData, info }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectPiece: (piece) => dispatch(selectPiece(piece)),
    onMove: (from, to) => dispatch(move({ from, to })),
    onLeave: () => dispatch(leave())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
