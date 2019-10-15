import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Piece from './piece'
import { getSide, getOrder, nextPlayerOrder } from '../../common/game/common'

function range(length) {
  return Array.from({ length }, (_, i) => i)
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
    minWidth: '40vmin'
  },
  score: {
    padding: theme.spacing(1, 2),
    boxSizing: 'content-box',
    maxWidth: '12vmin'
  },
  divider: {
    width: '100%'
  }
}))

const SmallPiece = styled(Piece)`
  display: inline-block;
  width: 2vmin;
  height: 2vmin;
  border-width: 0.4vmin;
`

const Score = ({ children: { side: playerSide, players, score } }) => {
  const playerOrder = getOrder(playerSide)
  const opponentOrder = nextPlayerOrder(playerOrder)
  const opponentSide = getSide(opponentOrder)
  const classes = useStyles()
  return (
    <Paper className={classes.infoPaper}>
      <Grid
        className={classes.root}
        container
        direction='column'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h6'>{players[opponentOrder]}</Typography>
        </Grid>
        <Grid item className={classes.score}>
          {range(score[opponentOrder]).map(i => (
            <SmallPiece key={i} piece={playerSide}/>
          ))}
        </Grid>
        <Divider className={classes.divider}/>
        <Grid item className={classes.score}>
          {range(score[playerOrder]).map(i => (
            <SmallPiece key={i} piece={opponentSide}/>
          ))}
        </Grid>
        <Grid item>
          <Typography variant='h6'>{players[playerOrder]}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Score
