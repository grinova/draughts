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
  ${({ movable, available }) => movable || available ? 'background-color: #20ab68' : ''};
  border: ${({ movable, available }) => movable || available ? '1vmin solid #60e517' : 'none'};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Board = ({ className, reverse, data, onClick }) => (
  <div className={className}>
    {(reverse ? data.slice().reverse() : data).map((row, y) => (
      <Row key={y}>
        {(reverse ? row.slice().reverse() : row).map((cell, x) => (
          <Cell key={x}
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
  background-color: ${BLACK_CELL};
  border-radius: 4px;

  & > ${Row}:nth-child(odd) {
    & > ${Cell}:nth-child(odd) {
      background-color: ${WHITE_CELL};
    }
  }

  & > ${Row}:nth-child(even) {
    & > ${Cell}:nth-child(even) {
      background-color: ${WHITE_CELL};
    }
  }

  & > ${Row}:first-child {
    & > ${Cell}:first-child {
      border-top-left-radius: 4px;
    }

    & > ${Cell}:last-child {
      border-top-right-radius: 4px;
    }
  }

  & > ${Row}:last-child {
    & > ${Cell}:first-child {
      border-bottom-left-radius: 4px;
    }

    & > ${Cell}:last-child {
      border-bottom-right-radius: 4px;
    }

  }
`

export default StyledBoard
