import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { WHITE_CELL, BLACK_CELL } from '../common/colors'
import { isPiece } from '../../common/game/common'
import Vec2 from '../../common/vec2'

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
    {(reverse ? data.slice().reverse() : data).map((row, y) => (
      <Row key={y}>
        {(reverse ? row.slice().reverse() : row).map((cell, x) => (
          <Cell key={x}
            bg={CELL_COLOR[(y + x) % 2]}
            available={cell.available}
            onClick={() => {
              onClick(reverse ? new Vec2(7 - x, 7 - y) : new Vec2(x, y))
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
