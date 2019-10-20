import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { range } from '../common/fn'

const PlayerName = styled.h3`
  margin: 0;
`

const Taken = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 10px;
  grid-gap: 10px;
  justify-content: center;
`

const SmallPiece = styled(Piece)`
  display: inline-block;
  width: 5vmin;
  height: 5vmin;
`

const Score = ({ className, playerName, score, side }) => {
  return (
    <div className={className}>
      <PlayerName>{playerName}</PlayerName>
      <Taken>
        {range(score).map(i => (
          <SmallPiece key={i} piece={side}/>
        ))}
      </Taken>
    </div>
  )
}

export default Score
