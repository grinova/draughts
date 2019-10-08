import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { WHITE_CELL, BLACK_CELL } from '../common/colors'
import { isPiece } from '../../common/game/common'

const Cell = styled.div`
  width: 10vmin;
  height: 10vmin;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;

  box-sizing: border-box;
  background-color: ${({ bg, movable, available }) => movable || available ? '#20ab68' : bg};
  border: ${({ movable, available }) => movable || available ? '1vmin solid #60e517' : 'none'};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const CELL_COLOR = [WHITE_CELL, BLACK_CELL]

const Board = ({ className, reverse, data, onClick }) => (
  <div className={className}>
    {(reverse ? data.reverse() : data).map((row, i) => (
      <Row key={i}>
        {(reverse ? row.reverse() : row).map((cell, j) => (
          <Cell key={j}
            bg={CELL_COLOR[(i + j) % 2]}
            available={cell.available}
            onClick={() => {
              if (reverse) {
                onClick(7 - i, 7 - j)
              } else {
                onClick(i, j)
              }
            }}
          >
            {isPiece(cell.piece) ?
              <Piece
                piece={cell.piece}
                movable={cell.movable}
                selected={cell.selected}/> :
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
