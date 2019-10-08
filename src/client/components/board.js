import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { WHITE_CELL, BLACK_CELL } from '../common/colors'
import { isPiece } from '../../common/game/common'

const Cell = styled.div`
  background-color: ${props => props.bg};
  width: 10vmin;
  height: 10vmin;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Board = ({ className, data, onClick }) => (
  <div className={className}>
    {data.map((row, i) => (
      <Row key={i}>
        {row.map((piece, j) => (
          <Cell key={j}
            bg={(i + j) % 2 ? BLACK_CELL : WHITE_CELL}
            onClick={() => onClick(i, j)}
          >
            {isPiece(piece) ?
              <Piece piece={piece}/> :
              null}
          </Cell>
        ))}
      </Row>
    ))}
  </div>
)

const StyledBoard = styled(Board)`
  display: inline-block;
  flex-direction: column;
`

export default StyledBoard
