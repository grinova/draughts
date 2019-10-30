import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { SCORE_SIZE } from '../config'
import { range } from '../common/fn'

const PlayerName = styled.h3`
  margin: 0;
`

const Taken = styled.div`
  display: grid;
  grid-template-rows: ${_ => range(SCORE_SIZE.height).map(_ => '1fr').join(' ')};
  grid-template-columns: ${_ => range(SCORE_SIZE.width).map(_ => '1fr').join(' ')};
  margin: 10px;
  grid-gap: 10px;
  justify-content: center;
`

const SmallPiece = styled(Piece)`
  display: inline-block;
  width: 5vmin;
  height: 5vmin;
`

const HidenSmallPiece = styled(SmallPiece)`
  visibility: hidden;
`

const Score = ({ className, playerName, score, side }) => {
  return (
    <div className={className}>
      <PlayerName>{playerName}</PlayerName>
      <Taken>
        {range(score).map(i => (
          <SmallPiece key={i} piece={side}/>
        ))}
        {range(SCORE_SIZE.width * SCORE_SIZE.height - score).map(i => (
          <HidenSmallPiece key={score + i} piece={side}/>
        ))}
      </Taken>
    </div>
  )
}

export default Score
