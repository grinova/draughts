import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '../components/button'
import Board from '../components/board'
import Score from '../components/score'
import { selectPiece } from '../actions'
import { move, leave } from '../../common/actions'
import {
  BLACK_MAN,
  getOrder,
  getSide,
  nextPlayerOrder,
  isOwnPiece
} from '../../common/game/common'

const BoardPageContainer = styled.div`
  display: flex;
  height: 95vh;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.media.mobile} {
    height: initial;
  }
`

const BoardPageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto auto;
  grid-template-areas:
    'board opponent-score'
    'board your-score'
    'board leave';
  grid-gap: 20px;

  @media ${({ theme }) => theme.media.mobile} {
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto;
    grid-template-areas:
      'your-score opponent-score'
      'board board'
      'leave leave';
    justify-content: space-between;
    width: 100%;
  }
`

const BoardGridItem = styled(Board)`
  grid-area: board;
  justify-self: right;
  align-self: center;

  @media ${({ theme }) => theme.media.mobile} {
    justify-self: center;
  }
`

const OpponentScoreGridItem = styled(Score)`
  grid-area: opponent-score;
  justify-self: left;

  @media ${({ theme }) => theme.media.mobile} {
    text-align: right;
    justify-self: right;
  }
`

const YourScoreGridItem = styled(Score)`
  grid-area: your-score;
  justify-self: left;
`

const LeaveButtonGridItem = styled.div`
  grid-area: leave;
  align-self: end;
  justify-self: left;

  @media ${({ theme }) => theme.media.mobile} {
    justify-self: center;
  }
`

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

  const { info } = props
  const playerOrder = getOrder(info.side)
  const opponentOrder = nextPlayerOrder(playerOrder)
  const opponentSide = getSide(opponentOrder)

  return (
    <BoardPageContainer>
      <BoardPageGrid>
          <BoardGridItem
            reverse={props.reverse}
            data={props.boardData}
            onClick={handleCellOnClick}/>
          <OpponentScoreGridItem
            playerName={info.players[opponentOrder]}
            score={info.score[opponentOrder]}
            side={info.side}
          />
          <YourScoreGridItem
            playerName={info.players[playerOrder]}
            score={info.score[playerOrder]}
            side={opponentSide}
          />
          <LeaveButtonGridItem>
            <Button defaultValue='Leave' onClick={handleLeave}/>
          </LeaveButtonGridItem>
      </BoardPageGrid>
    </BoardPageContainer>
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
