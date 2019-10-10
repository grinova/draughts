import React from 'react'
import styled from 'styled-components'
import Crown from './crown'
import {
  WHITE_PIECE_COLOR,
  BLACK_PIECE_COLOR,
  WHITE_PIECE_BORDER_COLOR,
  BLACK_PIECE_BORDER_COLOR
} from '../common/colors'
import {
  WHITE_MAN,
  BLACK_MAN,
  WHITE_KING,
  BLACK_KING,
  isKing
} from '../../common/game/common'

export const PIECE_COLORS = {
  [WHITE_MAN]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_MAN]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR },
  [WHITE_KING]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_KING]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR }
}

function boxShadow(color) {
  return `0 0 10px 5px ${color}`
}

const Piece = ({ className, piece }) => (
  <div className={className}>
    {isKing(piece) ? <Crown color={PIECE_COLORS[piece].border}/> : null}
  </div>
)

const StyledPiece = styled(Piece)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 5vmin;
  height: 5vmin;
  border-radius: 50%;
  border-style: solid;
  border-width: 1vmin;
  border-color: ${({ piece }) => PIECE_COLORS[piece].border};
  background-color: ${({ piece }) => PIECE_COLORS[piece].fill};

  box-shadow: ${({ movable, selected }) =>
    movable ? boxShadow('#16A8C7') :
      selected ? boxShadow('#00cffb') : 'none'};
`

export default StyledPiece
