import React from 'react'
import styled from 'styled-components'
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
  BLACK_KING
} from '../../common/game/common'

export const PIECE_COLORS = {
  [WHITE_MAN]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_MAN]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR },
  [WHITE_KING]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_KING]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR }
}

const Piece = styled.div`
  cursor: pointer;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  border-style: solid;
  border-width: 1vmin;
  border-color: ${props => PIECE_COLORS[props.piece].border};
  background-color: ${props => PIECE_COLORS[props.piece].fill};
`

export default Piece
