import React from 'react'
import styled from 'styled-components'
import Crown from './crown'
import { PIECE_COLORS } from '../common/colors'
import { isKing } from '../../common/game/common'

const Piece = ({ className, style, piece, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    {isKing(piece) ? <Crown color={PIECE_COLORS[piece].border}/> : null}
  </div>
)

const StyledPiece = styled(Piece)`
  /* @keyframes flash {
    0% {
      background-color: var(--white-cell-color);
    }
    100% {
      background-color: var(--white-piece-color);
    }
  } */

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 8vmin;
  height: 8vmin;
  border-radius: 50%;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1vmin;
  transition:
    transform 0.15s,
    border-width 0.15s,
    background-color 0.5s,
    border-color 0.5s;

  /* &:hover, &.selected {
    transform: scale(1.2, 1.2);
  } */
  &:hover {
    border-width: 0.5vmin;
  }
  /* &.selected {
    animation: flash 1s;
  } */
  background-color: ${({ piece }) => PIECE_COLORS[piece].fill};
  border-color: ${({ piece }) => PIECE_COLORS[piece].border};
  box-shadow: ${({ movable, selected }) =>
    (selected || movable) && '0 0 6px 6px hsl(311, 87%, 47%)' || 'none'
  };
`

export default StyledPiece
